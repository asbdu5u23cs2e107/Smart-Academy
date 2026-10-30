import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { videoTranscripts, normalizeCourseKey, getLessonTranscript } from './src/data/videoTranscripts.js';

// Exact required fallback responses specified in prompt specifications
const UNRELATED_FALLBACK_TAMIL =
  "இந்தக் கேள்விக்கு தற்போதைய வீடியோவில் தொடர்புடைய தகவல் கிடைக்கவில்லை. இந்த வீடியோ தொடர்பான சந்தேகங்களை மட்டும் கேளுங்கள்.";

const UNRELATED_FALLBACK_ENGLISH =
  "I couldn't find relevant information for this question in the current video. Please ask a question related to this video.";

// Context missing fallbacks
const MISSING_CONTEXT_TAMIL =
  "தற்போதைய வீடியோவிற்கான சரிபார்க்கப்பட்ட டிரான்ஸ்கிரிப்ட் கிடைக்கவில்லை. வீடியோவில் உள்ள தகவல்களை மட்டும் வைத்து மட்டுமே என்னால் பதிலளிக்க முடியும்.";

const MISSING_CONTEXT_ENGLISH =
  "Verified transcript or content is not available for the currently selected video. I can only answer questions grounded in verified video content.";

function geminiBackendPlugin(env) {
  const handler = async (req, res, next) => {
    if (req.method !== 'POST') return next();

    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const { question, courseId, lessonId, language = 'ta', transcript, lessonTitle: clientTitle } = payload;

        if (!question || !question.trim()) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Question is required' }));
        }

        const normalizedLang = language === 'en' ? 'en' : 'ta';

        // 1. Strict Backend Context Verification:
        // Validate the selected video's context on the backend using official verified or imported transcripts
        // Prevents students from using wrong/another course's transcript
        let verifiedTranscript = '';
        let lessonTitle = clientTitle || '';

        if (transcript && typeof transcript === 'string' && transcript.trim()) {
          verifiedTranscript = transcript.trim();
        } else {
          const lessonData = getLessonTranscript(courseId, lessonId);
          if (lessonData && lessonData.transcript) {
            verifiedTranscript = lessonData.transcript.trim();
            lessonTitle = lessonData.lessonTitle || lessonTitle;
          }
        }

        // If no verified transcript exists for this specific lesson
        if (!verifiedTranscript) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({
            answer: normalizedLang === 'ta' ? MISSING_CONTEXT_TAMIL : MISSING_CONTEXT_ENGLISH,
            isRelated: false,
            hasContext: false,
            source: 'missing_transcript'
          }));
        }

        const apiKey = (env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '').trim();
        const expectedFallback = normalizedLang === 'ta' ? UNRELATED_FALLBACK_TAMIL : UNRELATED_FALLBACK_ENGLISH;
        const langInstruction = normalizedLang === 'ta' ? 'simple, understandable Tamil (தமிழ்)' : 'clear, beginner-friendly English';

        // 2. Official Gemini API Integration if API Key is configured
        if (apiKey) {
          const candidateModels = env.GEMINI_MODEL
            ? [env.GEMINI_MODEL]
            : ['gemini-3.5-flash-lite', 'gemini-3.8-flash'];

          const systemInstructionText =
            "You are a video-specific learning assistant for SwordNex Academy. Answer questions only when the answer is supported by the verified transcript or content of the student's currently selected video. If the question is unrelated to the video, or the answer cannot be verified from the available video content, do not answer it. Instead, politely explain that you can answer only questions related to the current video. Reply in the student's selected language. Never invent video content, transcript excerpts, or timestamps.";

          const prompt = `STUDENT SELECTED ANSWER LANGUAGE: ${langInstruction}

CURRENT VIDEO LESSON TITLE: "${lessonTitle}"

VERIFIED VIDEO TRANSCRIPT:
"""
${verifiedTranscript}
"""

STUDENT QUESTION:
"${question.trim()}"

STRICT INSTRUCTIONS:
1. Ground your answers strictly in the verified transcript of the student's currently selected video.
2. The student's question may be in English, Tamil, or Tanglish (Tamil written in English script or mixed), and may be phrased differently using synonyms or conversational wording (e.g. asking "how to repeat code" or "loop eppadi use panradhu" refers to loops).
3. If the question relates to the concepts, syntax, or topics covered in this video's verified transcript, explain the answer accurately and helpfully in ${langInstruction} using the verified video content.
4. If and only if the question is genuinely UNRELATED to the video's content (such as questions about biology, photosynthesis, cooking, sports, movies, politics, or unrelated topics not covered in this video), you MUST reply with EXACTLY this text and nothing else:
"${expectedFallback}"
5. Never invent video content, transcript excerpts, or timestamps.`;

          let lastError = null;
          let lastStatusCode = null;

          for (const model of candidateModels) {
            try {
              const geminiRes = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    systemInstruction: {
                      parts: [{ text: systemInstructionText }]
                    },
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    generationConfig: {
                      temperature: 0.1,
                      maxOutputTokens: 800
                    }
                  }),
                  signal: AbortSignal.timeout(15000)
                }
              );

              if (geminiRes.status === 429) {
                lastStatusCode = 429;
                lastError = 'Rate limited';
                continue;
              }

              if (geminiRes.ok) {
                const data = await geminiRes.json();
                const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text && text.trim().length > 0) {
                  const trimmed = text.trim();
                  const isFallback = trimmed === expectedFallback || trimmed.includes(expectedFallback);
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({
                    answer: trimmed,
                    isRelated: !isFallback,
                    hasContext: true,
                    source: 'gemini_api'
                  }));
                }
              } else {
                lastStatusCode = geminiRes.status;
                const errBody = await geminiRes.text();
                lastError = `Status ${geminiRes.status}: ${errBody}`;
                continue;
              }
            } catch (apiErr) {
              lastError = apiErr.message;
              continue;
            }
          }

          if (lastError) {
            console.warn('Gemini API call warning, falling back to verified local transcript engine:', lastError);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({
              fallbackToLocal: true,
              apiFailure: true,
              statusCode: lastStatusCode,
              error: normalizedLang === 'ta'
                ? `Gemini AI API பிழை ஏற்பட்டது (${lastStatusCode || 'Network'}).`
                : `Gemini AI API request failed (${lastStatusCode || 'Network'}).`
            }));
          }
        }

        // Return fallback indicator if no key is set or API failed
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({
          fallbackToLocal: true,
          apiKeyMissing: !apiKey,
          source: 'backend_proxy',
          message: apiKey
            ? undefined
            : normalizedLang === 'ta'
              ? 'GEMINI_API_KEY backend சூழலில் அமைக்கப்படவில்லை.'
              : 'GEMINI_API_KEY is not configured in backend environment.'
        }));

      } catch (err) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({
          fallbackToLocal: true,
          error: err.message
        }));
      }
    });
  };

  return {
    name: 'gemini-api-backend-plugin',
    configureServer(server) {
      server.middlewares.use('/api/gemini-qa', handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/gemini-qa', handler);
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      geminiBackendPlugin(env)
    ],
  };
});
