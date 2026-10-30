import fs from 'fs';
import { videoTranscripts } from '../src/data/videoTranscripts.js';

const envText = fs.readFileSync('.env', 'utf-8');
const match = envText.match(/GEMINI_API_KEY=(.+)/);
const apiKey = match ? match[1].trim() : '';

const lesson = videoTranscripts.python[5];
const verifiedTranscript = lesson.transcript;
const lessonTitle = lesson.lessonTitle;

const UNRELATED_FALLBACK_TAMIL = "இந்தக் கேள்விக்கு தற்போதைய வீடியோவில் தொடர்புடைய தகவல் கிடைக்கவில்லை. இந்த வீடியோ தொடர்பான சந்தேகங்களை மட்டும் கேளுங்கள்.";
const UNRELATED_FALLBACK_ENGLISH = "I couldn't find relevant information for this question in the current video. Please ask a question related to this video.";

async function ask(question, lang) {
  const normalizedLang = lang === 'en' ? 'en' : 'ta';
  const expectedFallback = normalizedLang === 'ta' ? UNRELATED_FALLBACK_TAMIL : UNRELATED_FALLBACK_ENGLISH;
  const langInstruction = normalizedLang === 'ta' ? 'simple, understandable Tamil (தமிழ்)' : 'clear, beginner-friendly English';

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

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstructionText }] },
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.1, maxOutputTokens: 800 }
      }),
      signal: AbortSignal.timeout(15000)
    });
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    const isFallback = text === expectedFallback || text.includes(expectedFallback);
    console.log(`Q: "${question}" [${lang}]`);
    console.log(`Related: ${!isFallback}`);
    console.log(`Answer:\n${text}\n`);
    return { isRelated: !isFallback, text };
  } catch (err) {
    console.error('Error for Q:', question, err.message);
  }
}

async function main() {
  const tests = [
    // Relevant questions in English (varied phrasing)
    { q: 'What is a for loop?', lang: 'en', expectRelated: true },
    { q: 'how to iterate over a list in python?', lang: 'en', expectRelated: true },
    { q: 'how can I avoid infinite loops in while loop?', lang: 'en', expectRelated: true },
    { q: 'what is range() function?', lang: 'en', expectRelated: true },
    { q: 'tell me about the break statement', lang: 'en', expectRelated: true },

    // Relevant questions in Tamil
    { q: 'லூப் என்றால் என்ன?', lang: 'ta', expectRelated: true },
    { q: 'லூப்பின் பயன் என்ன?', lang: 'ta', expectRelated: true },
    { q: 'while loop-ல் counter variable ஏன் தேவை?', lang: 'ta', expectRelated: true },
    { q: 'break கூற்று என்ன செய்கிறது?', lang: 'ta', expectRelated: true },

    // Relevant questions in Tanglish
    { q: 'while loop eppadi work aagum?', lang: 'ta', expectRelated: true },
    { q: 'for loop syntax sollunga', lang: 'ta', expectRelated: true },
    { q: 'break statement enna seiyum?', lang: 'ta', expectRelated: true },

    // Unrelated questions in English
    { q: 'What is photosynthesis?', lang: 'en', expectRelated: false },
    { q: 'Who won the cricket world cup?', lang: 'en', expectRelated: false },

    // Unrelated questions in Tamil
    { q: 'ஒளிச்சேர்க்கை என்றால் என்ன?', lang: 'ta', expectRelated: false },
    { q: 'சமையல் செய்வது எப்படி?', lang: 'ta', expectRelated: false }
  ];

  let passed = 0;
  for (const t of tests) {
    const res = await ask(t.q, t.lang);
    if (res && res.isRelated === t.expectRelated) {
      passed++;
      console.log(`>>> [PASS] Expected related=${t.expectRelated}, got related=${res.isRelated}\n`);
    } else {
      console.log(`>>> [FAIL] Expected related=${t.expectRelated}, got related=${res?.isRelated}\n`);
    }
  }
  console.log(`TOTAL PASSED: ${passed}/${tests.length}`);
}

main();
