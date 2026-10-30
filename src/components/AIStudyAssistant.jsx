import React, { useState, useEffect } from 'react';
import { Sparkles, HelpCircle, AlertCircle, Bot, User, CheckCircle2, RefreshCw } from 'lucide-react';
import { askAIStudyAssistant, getLessonTranscript } from '../services/aiStudyAssistant';

const AIStudyAssistant = ({ courseId, activeLesson }) => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState(null);

  // Language state: 'ta' (Tamil) or 'en' (English). Kept active until student changes it.
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('swordnex_doubt_lang') || 'ta';
    } catch {
      return 'ta';
    }
  });

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    try {
      localStorage.setItem('swordnex_doubt_lang', newLang);
    } catch (e) {
      console.warn('Could not persist language to localStorage:', e);
    }
  };

  // Check if transcript is available for the current lesson
  const currentLessonId = activeLesson?.id || activeLesson?.num || 1;
  const transcriptData = activeLesson ? getLessonTranscript(courseId, currentLessonId, activeLesson) : null;
  const hasTranscript = Boolean(transcriptData && transcriptData.transcript);

  // Suggested questions based on active lesson and student's selected language
  const getSampleQuestions = () => {
    if (!activeLesson) return [];
    const title = activeLesson.title.toLowerCase();

    if (language === 'ta') {
      if (title.includes('loop')) {
        return [
          'for loop என்றால் என்ன?',
          'while loop என்றால் என்ன?',
          'range() செயல்பாடு என்ன செய்கிறது?',
          'break கூற்று என்ன செய்கிறது?',
          'ஒளிச்சேர்க்கை (Photosynthesis) என்றால் என்ன?' // Strict unrelated question test
        ];
      }
      if (title.includes('html')) {
        return [
          'HTML5 செமாண்டிக் கூறுகள் யாவை?',
          'form மற்றும் input கூறுகள் எவ்வாறு செயல்படுகின்றன?',
          'ஒளிச்சேர்க்கை என்றால் என்ன?'
        ];
      }
      if (title.includes('css') || title.includes('flexbox') || title.includes('grid')) {
        return [
          'Flexbox மற்றும் Grid வேறுபாடு என்ன?',
          'display: flex எப்போது பயன்படுத்த வேண்டும்?',
          'ஒளிச்சேர்க்கை என்றால் என்ன?'
        ];
      }
      if (title.includes('javascript') || title.includes('event')) {
        return [
          'addEventListener எவ்வாறு செயல்படுகிறது?',
          'Promises மற்றும் async/await என்றால் என்ன?',
          'ஒளிச்சேர்க்கை என்றால் என்ன?'
        ];
      }
      if (title.includes('react')) {
        return [
          'useState ஹூக் என்றால் என்ன?',
          'React props என்றால் என்ன?',
          'ஒளிச்சேர்க்கை என்றால் என்ன?'
        ];
      }
      if (title.includes('machine learning') || title.includes('supervised') || title.includes('model')) {
        return [
          'Supervised vs Unsupervised வேறுபாடு என்ன?',
          'Train/Test split எதற்காகப் பயன்படுகிறது?',
          'ஒளிச்சேர்க்கை என்றால் என்ன?'
        ];
      }
      if (title.includes('java') || title.includes('jvm')) {
        return [
          'JVM மற்றும் JDK வேறுபாடு என்ன?',
          'Java-வில் OOP தூண்கள் யாவை?',
          'ஒளிச்சேர்க்கை என்றால் என்ன?'
        ];
      }
      if (title.includes('sql') || title.includes('database')) {
        return [
          'SELECT மற்றும் WHERE எவ்வாறு செயல்படுகிறது?',
          'INNER JOIN மற்றும் LEFT JOIN வேறுபாடு என்ன?',
          'ஒளிச்சேர்க்கை என்றால் என்ன?'
        ];
      }
      return [
        `${activeLesson.title} பாடத்தில் என்ன விவரிக்கப்பட்டுள்ளது?`,
        'ஒளிச்சேர்க்கை என்றால் என்ன?'
      ];
    }

    // English sample questions
    if (title.includes('loop')) {
      return [
        'What is a for loop?',
        'What is a while loop?',
        'What does the range() function do?',
        'What does the break statement do?',
        'What is photosynthesis?' // Strict unrelated question test
      ];
    }
    if (title.includes('html')) {
      return [
        'What are HTML5 semantic elements?',
        'How do form and input elements work?',
        'What is photosynthesis?'
      ];
    }
    if (title.includes('css') || title.includes('flexbox') || title.includes('grid')) {
      return [
        'What is the difference between Flexbox and Grid?',
        'When should I use display: flex?',
        'What is photosynthesis?'
      ];
    }
    if (title.includes('javascript') || title.includes('event')) {
      return [
        'What is addEventListener?',
        'What are JavaScript Promises and async/await?',
        'What is photosynthesis?'
      ];
    }
    if (title.includes('react')) {
      return [
        'What is the useState hook?',
        'What are React props?',
        'What is photosynthesis?'
      ];
    }
    if (title.includes('machine learning') || title.includes('supervised') || title.includes('model')) {
      return [
        'What is the difference between supervised and unsupervised learning?',
        'Why do we split data into train and test sets?',
        'What is photosynthesis?'
      ];
    }
    if (title.includes('java') || title.includes('jvm')) {
      return [
        'What is the difference between JVM and JDK?',
        'What are the core OOP pillars in Java?',
        'What is photosynthesis?'
      ];
    }
    if (title.includes('sql') || title.includes('database')) {
      return [
        'How do SELECT and WHERE work?',
        'What is the difference between INNER JOIN and LEFT JOIN?',
        'What is photosynthesis?'
      ];
    }
    return [
      `What is covered in ${activeLesson.title}?`,
      'What is photosynthesis?'
    ];
  };

  // Reset or update history greeting when active lesson or language changes
  useEffect(() => {
    setQuestion('');
    setError(null);

    const welcomeText = language === 'ta'
      ? (hasTranscript
          ? `வணக்கம்! "${activeLesson?.title || ''}" பாடத்திற்கான Gemini AI வீடியோ சந்தேக உதவியாளர் தயார். இந்த வீடியோவில் உள்ள பாடத்தைப் பற்றி ஏதேனும் சந்தேகம் கேளுங்கள்.`
          : `தற்போதைய வீடியோவிற்கான சரிபார்க்கப்பட்ட டிரான்ஸ்கிரிப்ட் கிடைக்கவில்லை. வீடியோவில் உள்ள தகவல்களை மட்டும் வைத்து மட்டுமே என்னால் பதிலளிக்க முடியும்.`)
      : (hasTranscript
          ? `Hello! Gemini AI Video Doubt Assistant is ready for "${activeLesson?.title || ''}". Ask any doubt grounded strictly in this video's verified content.`
          : `Verified transcript or content is not available for the currently selected video. I can only answer questions grounded in verified video content.`);

    setChatHistory([
      {
        id: 'welcome',
        type: 'assistant',
        text: welcomeText
      }
    ]);
  }, [activeLesson?.id, activeLesson?.title, courseId, hasTranscript, language]);

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!question.trim() || loading || !activeLesson) return;

    const userQ = question.trim();
    setQuestion('');
    setError(null);

    // Add user question to chat
    const userMsg = {
      id: `user-${Date.now()}`,
      type: 'user',
      text: userQ
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await askAIStudyAssistant({
        question: userQ,
        courseId,
        lessonId: currentLessonId,
        lessonTitle: activeLesson.title,
        language,
        activeLesson
      });

      const assistantMsg = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        text: response.answer,
        source: response.source,
        isRelated: response.isRelated
      };

      setChatHistory((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error querying AI Study Assistant:', err);
      const errText = language === 'ta'
        ? 'கேள்விக்கு பதிலளிப்பதில் பிழை ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.'
        : 'An error occurred while generating your answer. Please try again.';
      setError(errText);
      setChatHistory((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          type: 'assistant',
          text: errText,
          isError: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSampleClick = (sampleQ) => {
    setQuestion(sampleQ);
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-650 flex-shrink-0">
            <Sparkles className="w-5 h-5 text-purple-650" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">
                Gemini AI Video Doubt Assistant
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold">
                Active Video Only
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified Source: <span className="font-semibold text-slate-700">Lesson {activeLesson?.id} ({activeLesson?.title})</span>
            </p>
          </div>
        </div>

        {hasTranscript ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-purple-650 bg-purple-50 px-3 py-1 rounded-full border border-purple-100 self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-650" /> Transcript Verified
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 self-start sm:self-auto">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Context Unavailable
          </span>
        )}
      </div>

      {/* Language Selection: தமிழ் / English */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold text-slate-700">
            {language === 'ta' ? 'பதில் மொழி தேர்வு:' : 'Answer Language:'}
          </span>
          <div className="inline-flex rounded-xl p-1 bg-white border border-slate-200 shadow-sm" role="group" aria-label="Select answer language">
            <button
              type="button"
              onClick={() => handleLanguageChange('ta')}
              className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-all ${
                language === 'ta'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              தமிழ்
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange('en')}
              className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-all ${
                language === 'en'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              English
            </button>
          </div>
        </div>

        <span className="text-[11px] font-medium text-slate-500">
          {language === 'ta'
            ? '✓ எளிமையான தமிழில் பதில்கள் வழங்கப்படும்'
            : '✓ Answers provided in clear, beginner-friendly English'}
        </span>
      </div>

      {/* Suggested Questions */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-slate-400" />
          {language === 'ta' ? 'மாதிரி கேள்விகள்:' : 'Quick test questions:'}
        </span>
        <div className="flex flex-wrap gap-2">
          {getSampleQuestions().map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSampleClick(sample)}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-650 hover:border-purple-200 border border-slate-200 text-slate-650 transition-all text-left"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation Thread */}
      <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
        {chatHistory.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 text-xs p-3.5 rounded-2xl ${
              msg.type === 'user'
                ? 'bg-purple-50/70 border border-purple-100 text-slate-800 ml-6'
                : 'bg-slate-50 border border-slate-100 text-slate-700 mr-6'
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {msg.type === 'user' ? (
                <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold">
                  <User className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold">
                  <Bot className="w-3.5 h-3.5 text-purple-650" />
                </div>
              )}
            </div>
            <div className="space-y-1 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                {msg.type === 'user' ? 'You' : 'Gemini AI Assistant'}
              </span>
              <p className="whitespace-pre-line leading-relaxed text-slate-800">{msg.text}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 text-xs p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-500 mr-6 animate-pulse items-center">
            <RefreshCw className="w-4 h-4 text-purple-650 animate-spin" />
            <span>
              {language === 'ta'
                ? `Gemini AI "${activeLesson?.title || ''}" பாடத்தின் டிரான்ஸ்கிரிப்டை ஆய்வு செய்கிறது...`
                : `Gemini AI is analyzing the verified transcript for "${activeLesson?.title || ''}"...`}
            </span>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Doubt Question Form with Language-aware Placeholder and "Ask" button */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={
            language === 'ta'
              ? `"${activeLesson?.title || 'இந்த வீடியோ'}" தொடர்பான உங்கள் சந்தேகத்தைக் கேளுங்கள்...`
              : `Ask a question about "${activeLesson?.title || 'this video lesson'}"...`
          }
          disabled={loading}
          className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-purple-400 focus:bg-white text-slate-900 placeholder:text-slate-400 transition-colors"
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="btn-primary text-xs px-5 py-2.5 rounded-xl inline-flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask</span>
        </button>
      </form>

      <p className="text-[10px] text-slate-400 text-center">
        {language === 'ta'
          ? 'குறிப்பு: தற்போதைய வீடியோவில் உள்ள சரிபார்க்கப்பட்ட தகவல்களை மட்டுமே கொண்டு Gemini AI பதிலளிக்கும்.'
          : 'Note: Gemini AI verifies answers solely against the transcript of the currently active video lesson.'}
      </p>
    </div>
  );
};

export default AIStudyAssistant;
