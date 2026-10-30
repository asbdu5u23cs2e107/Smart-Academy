// AI Study Assistant Service
// Answers student questions strictly based on the currently selected video's verified transcript.
// Supports English, Tamil, and Tanglish with strict guardrails and secure backend integration.

import {
  videoTranscripts,
  normalizeCourseKey,
  getLessonTranscript,
  importLessonTranscript,
  getImportedTranscript
} from '../data/videoTranscripts.js';

export {
  videoTranscripts,
  normalizeCourseKey,
  getLessonTranscript,
  importLessonTranscript,
  getImportedTranscript
};

// Exact required response strings as mandated by specifications
export const UNRELATED_FALLBACK_TAMIL =
  "இந்தக் கேள்விக்கு தற்போதைய வீடியோவில் தொடர்புடைய தகவல் கிடைக்கவில்லை. இந்த வீடியோ தொடர்பான சந்தேகங்களை மட்டும் கேளுங்கள்.";

export const UNRELATED_FALLBACK_ENGLISH =
  "I couldn't find relevant information for this question in the current video. Please ask a question related to this video.";

export const MISSING_CONTEXT_TAMIL =
  "தற்போதைய வீடியோவிற்கான சரிபார்க்கப்பட்ட டிரான்ஸ்கிரிப்ட் கிடைக்கவில்லை. வீடியோவில் உள்ள தகவல்களை மட்டும் வைத்து மட்டுமே என்னால் பதிலளிக்க முடியும்.";

export const MISSING_CONTEXT_ENGLISH =
  "Verified transcript or content is not available for the currently selected video. I can only answer questions grounded in verified video content.";

// Backward compatibility aliases
export const UNRELATED_QUESTION_RESPONSE = UNRELATED_FALLBACK_TAMIL;
export const MISSING_INFO_RESPONSE = UNRELATED_FALLBACK_TAMIL;
export const CONTEXT_UNAVAILABLE_RESPONSE = MISSING_CONTEXT_TAMIL;

// Explicit non-computing / general knowledge indicators (science, geography, politics, sports, food, etc.)
// Used to identify genuinely unrelated questions
const UNRELATED_GENERAL_KNOWLEDGE = new Set([
  "photosynthesis", "solar", "planet", "planets", "sun", "earth", "mars",
  "jupiter", "saturn", "galaxy", "universe", "space", "astronomy", "biology",
  "organism", "chlorophyll", "plant", "plants", "tree", "trees", "animal",
  "animals", "heart", "blood", "stomach", "medicine", "doctor", "disease",
  "recipe", "bake", "baking", "cake", "cook", "cooking", "food", "kitchen",
  "president", "minister", "parliament", "country", "capital", "currency",
  "war", "battle", "history", "geography", "cricket", "football", "soccer",
  "tennis", "olympics", "movie", "actor", "actress", "song", "singer", "music",
  "weather", "rain", "climate", "mountain", "river", "ocean",
  // Tamil unrelated terms
  "போட்டோசிந்தசிஸ்", "ஒளிச்சேர்க்கை", "சூரியன்", "பூமி", "கிரகம்", "செடி",
  "தாவரம்", "விலங்கு", "உயிரியல்", "வானிலை", "மழை", "கிரிக்கெட்", "விளையாட்டு",
  "சமையல்", "உணவு", "திரைப்படம்", "நடிகர்", "பாடல்", "அரசியல்", "மருந்து"
]);

/**
 * Checks if string contains Tamil characters.
 */
export const containsTamil = (text) => {
  return /[\u0B80-\u0BFF]/.test(text || "");
};

/**
 * Tokenize text into normalized lowercase words.
 */
const tokenize = (text) => {
  if (!text || typeof text !== "string") return [];
  return text
    .toLowerCase()
    .replace(/[^\w\s\u0B80-\u0BFF]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1);
};

/**
 * Check if the question is explicitly from an unrelated general knowledge domain.
 */
export const isExplicitlyUnrelated = (question) => {
  const tokens = tokenize(question);
  for (const token of tokens) {
    if (UNRELATED_GENERAL_KNOWLEDGE.has(token)) {
      return true;
    }
  }
  return false;
};

/**
 * Extracts and synthesizes a verified answer from the transcript text in the local fallback engine.
 * Supports English, Tamil, and Tanglish questions.
 */
const extractAnswerFromTranscript = (question, transcriptData, language = 'ta') => {
  const qLower = question.toLowerCase();
  const isTamil = language === 'ta';
  const transcript = transcriptData.transcript || '';
  const paragraphs = transcript.split(/\n\s*\n|\r\n\s*\r\n/).filter((p) => p.trim().length > 0);
  const title = (transcriptData.lessonTitle || '').toLowerCase();
  const topic = (transcriptData.topic || '').toLowerCase();

  // 1. Python Loops
  if (title.includes("loop") || topic.includes("loop") || transcript.toLowerCase().includes("what is a loop?")) {
    if (qLower.includes("for loop") || (qLower.includes("for") && qLower.includes("loop")) || qLower.includes("ஃபார்") || qLower.includes("for loop syntax")) {
      if (isTamil) {
        return `இந்த வீடியோ பாடத்தின்படி:
பைத்தானில் for loop என்பது ஒரு வரிசைமுறை (list, tuple, dictionary, set, அல்லது string) உறுப்புகளை ஒவ்வொன்றாக அணுகி குறிப்பிட்ட குறியீட்டுத் தொகுதியை மீண்டும் மீண்டும் இயக்கப் பயன்படுகிறது.
for loop-ல் 'in' என்ற முக்கிய சொல் (keyword) பயன்படுத்தப்படுகிறது.

தொடரியல் (Syntax):
for item in sequence:
    # code block to execute

எடுத்துக்காட்டு:
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)`;
      }
      const match = paragraphs.find((p) => p.includes("What is a For Loop?") || p.includes("A for loop in Python"));
      return `According to this video lesson:
${(match || paragraphs[1] || "").trim()}`;
    }

    if (qLower.includes("while loop") || (qLower.includes("while") && qLower.includes("loop")) || qLower.includes("வைல்") || qLower.includes("infinite loop") || qLower.includes("counter")) {
      if (isTamil) {
        return `இந்த வீடியோ பாடத்தின்படி:
பைத்தானில் while loop என்பது கொடுக்கப்பட்ட நிபந்தனை True ஆக இருக்கும் வரை மீண்டும் மீண்டும் செயல்படுத்தப்படும்.
முடிவற்ற லூப்பை (infinite loop) தவிர்க்க, லூப்பிற்குள் நிபந்தனை மாறுவதை உறுதி செய்ய வேண்டும் (எ.கா: count += 1 போன்ற கவுண்டர் மாறியைப் பயன்படுத்தி).`;
      }
      const match = paragraphs.find((p) => p.includes("What is a While Loop?") || p.includes("A while loop in Python"));
      return `According to this video lesson:
${(match || paragraphs[2] || "").trim()}`;
    }

    if (qLower.includes("range") || qLower.includes("ரேஞ்ச்")) {
      if (isTamil) {
        return `இந்த வீடியோ பாடத்தின்படி:
range() செயல்பாடு ஒரு குறிப்பிட்ட எண்ணிக்கையில் எண்களின் வரிசையை உருவாக்குகிறது.
இது முன்னிருப்பாக 0-ல் தொடங்கி, 1 வீதம் அதிகரித்து, குறிப்பிடப்பட்ட எண்ணிற்கு முன் நிற்கும் (எ.கா: range(5) என்பது 0, 1, 2, 3, 4 ஐத் தரும்). range(start, stop, step) எனவும் பயன்படுத்தலாம்.`;
      }
      const match = paragraphs.find((p) => p.includes("The range() function:") || p.includes("range()"));
      return `According to this video lesson:
${(match || "").trim()}`;
    }

    if (qLower.includes("break") || qLower.includes("continue") || qLower.includes("pass") || qLower.includes("பிரேக்") || qLower.includes("கண்டினியூ")) {
      if (isTamil) {
        return `இந்த வீடியோ பாடத்தின்படி லூப் கட்டுப்பாட்டுக் கூற்றுகள்:
1. break: லூப்பை உடனடியாக நிறுத்தி வெளியேற்றும்.
2. continue: தற்போதைய சுற்றைத் தவிர்த்து அடுத்த சுற்றுக்குச் செல்லும்.
3. pass: ஒரு வெற்று இடம்பிடிப்பான் (placeholder) ஆகச் செயல்படுகிறது.`;
      }
      const match = paragraphs.find((p) => p.includes("Loop Control Statements:") || p.includes("break statement"));
      return `According to this video lesson:
${(match || "").trim()}`;
    }

    if (qLower.includes("loop") || qLower.includes("லூப்") || qLower.includes("சுழற்சி") || qLower.includes("repeat") || qLower.includes("பயன்")) {
      if (isTamil) {
        return `இந்த வீடியோ பாடத்தின்படி:
நிரலாக்கத்தில் லூப் (loop) என்பது ஒரு நிபந்தனை உண்மையாக இருக்கும் வரை அல்லது ஒரு வரிசையில் உள்ள ஒவ்வொரு பொருளுக்கும் மீண்டும் மீண்டும் ஒரு குறியீட்டுத் தொகுதியை இயக்குவதற்கான கட்டுப்பாட்டு அமைப்பாகும்.`;
      }
      const match = paragraphs.find((p) => p.includes("What is a Loop?"));
      return `According to this video lesson:
${(match || "").trim()}`;
    }
  }

  // 2. Python Introduction
  if (title.includes("python") && (title.includes("intro") || topic.includes("installation") || topic.includes("interpreter"))) {
    if (qLower.includes("who created") || qLower.includes("guido") || qLower.includes("1991") || qLower.includes("python") || qLower.includes("பைதான்") || qLower.includes("indentation")) {
      if (isTamil) {
        return `இந்த வீடியோ பாடத்தின்படி:
பைதான் 1991-ல் கைடோ வான் ரோஸம் (Guido van Rossum) என்பவரால் உருவாக்கப்பட்டது.
இது எளிதில் படிக்கக்கூடிய தொடரியல் (syntax) கொண்ட உயர்நிலை நிரலாக்க மொழியாகும். இதில் கர்லி பிரேஸ்களுக்குப் பதிலாக இடைவெளி (indentation) பயன்படுத்தப்படுகிறது.`;
      }
      return `According to this video lesson:
${paragraphs[0] || transcript}`;
    }
  }

  // 3. HTML Basics & Markup
  if (title.includes("html") || topic.includes("html") || topic.includes("markup")) {
    if (qLower.includes("semantic") || qLower.includes("element") || qLower.includes("tag") || qLower.includes("form") || qLower.includes("input") || qLower.includes("செமாண்டிக்")) {
      if (isTamil) {
        return `இந்த வீடியோ பாடத்தின்படி:
HTML5 செமாண்டிக் கூறுகளில் <header>, <nav>, <main>, <section>, <article>, மற்றும் <footer> ஆகியவை அடங்கும்.
செமாண்டிக் HTML வெறும் தோற்றத்திற்குப் பதிலாக உலாவிகளுக்கும் ஸ்கிரீன் ரீடர்களுக்கும் அர்த்தத்தை வழங்குகிறது.`;
      }
      return `According to this video lesson:
${paragraphs.find((p) => p.toLowerCase().includes("semantic")) || transcript}`;
    }
  }

  // 4. CSS Layouts: Flexbox vs. Grid
  if (title.includes("css") || title.includes("flexbox") || title.includes("grid")) {
    if (qLower.includes("flexbox") || qLower.includes("grid") || qLower.includes("difference") || qLower.includes("தளவமைப்பு")) {
      if (isTamil) {
        return `இந்த வீடியோ பாடத்தின்படி:
1. Flexbox (display: flex) என்பது ஒரு பரிமாண (1D) தளவமைப்பு ஆகும். இது வரிசை அல்லது நெடுவரிசை திசையில் உறுப்புகளை சீரமைக்கப் பயன்படுகிறது.
2. CSS Grid (display: grid) என்பது இரு பரிமாண (2D) தளவமைப்பு ஆகும். இது வரிசைகள் மற்றும் நெடுவரிசைகளை ஒரே நேரத்தில் கையாளுகிறது.
விதி: கூறுகளின் சீரமைப்புக்கு Flexbox-ஐயும், முழு பக்கக் கட்டமைப்புக்கு CSS Grid-ஐயும் பயன்படுத்தவும்.`;
      }
      return `According to this video lesson:
${paragraphs[1] || transcript}`;
    }
  }

  // 5. JavaScript Logic & Events
  if (title.includes("javascript") || topic.includes("javascript") || title.includes("event")) {
    if (qLower.includes("event") || qLower.includes("dom") || qLower.includes("addeventlistener") || qLower.includes("async") || qLower.includes("நிகழ்வு")) {
      if (isTamil) {
        return `இந்த வீடியோ பாடத்தின்படி:
1. document.querySelector() மூலம் DOM உறுப்புகளைத் தேர்ந்தெடுக்கலாம்.
2. addEventListener('click', handler) மூலம் பயனர் கிளிக்குகளைக் கையாளலாம்.
3. Promises மற்றும் async/await மூலம் இடைமுகத்தை முடக்காமல் ஒத்திசைவற்ற முறையில் தரவைப் பெறலாம்.`;
      }
      return `According to this video lesson:
${paragraphs[1] || transcript}`;
    }
  }

  // 6. React Components & State
  if (title.includes("react") || topic.includes("react") || topic.includes("component")) {
    if (qLower.includes("state") || qLower.includes("usestate") || qLower.includes("props") || qLower.includes("component") || qLower.includes("hook") || qLower.includes("கம்போனன்ட்")) {
      if (isTamil) {
        return `இந்த வீடியோ பாடத்தின்படி:
1. Functional Components: JSX-ஐ திருப்பி வழங்கும் ஜாவாஸ்கிரிப்ட் செயல்பாடுகள்.
2. Props: பெற்றோர் கூறிலிருந்து குழந்தைக்கு அனுப்பப்படும் மாற்ற முடியாத உள்ளீடுகள்.
3. useState Hook: கூறுகளில் நிலையை (state) நிர்வகிக்க உதவுகிறது. நிலை மாறும் போது ரியாக்ட் கூறுகளை மீண்டும் வரைகிறது (re-render).`;
      }
      return `According to this video lesson:
${paragraphs[1] || transcript}`;
    }
  }

  // 7. Java Basics & OOP
  if (title.includes("java") || topic.includes("java") || topic.includes("jvm")) {
    if (qLower.includes("jvm") || qLower.includes("jdk") || qLower.includes("jre") || qLower.includes("wora") || qLower.includes("ஜாவா") || qLower.includes("class")) {
      if (isTamil) {
        return `இந்த வீடியோ பாடத்தின்படி:
1. Java என்பது 'Write Once, Run Anywhere' (WORA) தத்துவத்தைக் கொண்ட JVM அடிப்படையிலான நிரலாக்க மொழியாகும்.
2. JDK (Java Development Kit) கம்பைலரையும் (javac), JRE ரன்டைமையும் கொண்டுள்ளது.
3. ஒவ்வொரு Java நிரலும் public class மற்றும் public static void main(String[] args) முறையைக் கொண்டிருக்க வேண்டும்.`;
      }
      return `According to this video lesson:
${paragraphs[0] || transcript}`;
    }
    if (qLower.includes("oop") || qLower.includes("inheritance") || qLower.includes("encapsulation") || qLower.includes("extends")) {
      if (isTamil) {
        return `இந்த வீடியோ பாடத்தின்படி:
1. Encapsulation: தரவுகளையும் முறைகளையும் கிளாஸ்களுக்குள் அணுகல் மாற்றிகளுடன் (private, public) அடைத்து வைப்பது.
2. Inheritance: extends முக்கிய சொல்லைப் பயன்படுத்தி பெற்றோர் வகுப்பிலிருந்து குழந்தை வகுப்பை உருவாக்குவது.`;
      }
      return `According to this video lesson:
${paragraphs[1] || transcript}`;
    }
  }

  // 8. SQL Queries
  if (title.includes("sql") || topic.includes("sql") || topic.includes("table") || topic.includes("database")) {
    if (qLower.includes("select") || qLower.includes("crud") || qLower.includes("join") || qLower.includes("where") || qLower.includes("தரவுத்தளம்")) {
      if (isTamil) {
        return `இந்த வீடியோ பாடத்தின்படி:
1. SQL என்பது தொடர்புடைய தரவுத்தளங்களை (relational databases) நிர்வகிக்கும் மொழியாகும்.
2. அடிப்படை வினவல்கள்: SELECT (தரவைப் பெற), INSERT INTO (புதிய தரவைச் சேர்க்க), UPDATE (மாற்ற), DELETE (நீக்க).
3. WHERE விதிமுறை நிபந்தனைகளின் அடிப்படையில் வரிசைகளை வடிகட்டுகிறது.`;
      }
      return `According to this video lesson:
${paragraphs[0] || transcript}`;
    }
  }

  // 9. Machine Learning & AI
  if (title.includes("machine learning") || topic.includes("supervised") || title.includes("ml")) {
    if (qLower.includes("supervised") || qLower.includes("unsupervised") || qLower.includes("ml") || qLower.includes("split") || qLower.includes("கற்றல்")) {
      if (isTamil) {
        return `இந்த வீடியோ பாடத்தின்படி:
1. Machine Learning என்பது தரவுகளிலிருந்து வடிவங்களைக் கற்றுக்கொண்டு முன்னறிவிப்புகளைச் செய்யும் அமைப்பாகும்.
2. Supervised Learning: லேபிளிடப்பட்ட தரவுகளைக் கொண்டு உள்ளீடுகள் (features) மற்றும் வெளியீடுகளைக் (labels) கற்பது.
3. Unsupervised Learning: லேபிள்கள் இல்லாத தரவுகளிலிருந்து வடிவங்களைக் கண்டறிவது (clustering).
4. Train/Test Split: தரவை பயிற்சி (80%) மற்றும் சோதனை (20%) தொகுதிகளாகப் பிரித்து மதிப்பீடு செய்வது.`;
      }
      return `According to this video lesson:
${paragraphs[0] || transcript}`;
    }
  }

  // 10. Data Science & Pandas
  if (title.includes("data science") || topic.includes("pandas") || topic.includes("data wrangling")) {
    if (qLower.includes("pandas") || qLower.includes("dataframe") || qLower.includes("series") || qLower.includes("data science") || qLower.includes("தரவு")) {
      if (isTamil) {
        return `இந்த வீடியோ பாடத்தின்படி:
1. Data Science செயல்முறை: தரவு சேகரிப்பு, சுத்தம் செய்தல், ஆய்வு (EDA), மாடலிங் மற்றும் நுண்ணறிவுகளை வழங்குதல்.
2. Pandas தரவு கட்டமைப்புகள்: Series (1D வரிசை) மற்றும் DataFrame (2D அட்டவணை).
3. தரவு சுத்தம் செய்தல்: isna(), fillna() மற்றும் dropna() மூலம் விடுபட்ட தரவுகளைக் கையாளுதல்.`;
      }
      return `According to this video lesson:
${paragraphs[0] || transcript}`;
    }
  }

// Common conversational stopwords to ignore during semantic matching
const STOP_WORDS = new Set([
  "a", "an", "the", "in", "on", "at", "to", "for", "of", "with", "by", "from",
  "is", "are", "was", "were", "be", "been", "being", "have", "has", "had",
  "do", "does", "did", "can", "could", "should", "would", "will", "shall",
  "what", "which", "who", "whom", "this", "that", "these", "those", "how",
  "why", "where", "when", "about", "tell", "me", "explain", "describe",
  "give", "show", "please", "you", "i", "we", "they", "it", "its", "my",
  "your", "our", "their", "and", "or", "but", "so", "as", "if", "than",
  "video", "lesson", "question",
  // Common Tamil conversational stopwords
  "என்ன", "என்றால்", "பற்றி", "சொல்", "விளக்கு", "எப்படி", "செய்கிறது",
  "பயன்படுகிறது", "எவை", "யார்", "எப்போது", "ஒரு", "மற்றும்", "ஆனால்",
  "வீடியோ", "பாடம்", "கேள்வி"
]);

  // 11. Generic paragraph semantic match for any verified transcript
  const queryWords = tokenize(question).filter((w) => w.length > 2 && !STOP_WORDS.has(w));
  if (queryWords.length === 0) return null;

  const lessonKeywords = new Set(
    (transcriptData.keywords || []).flatMap((k) => tokenize(k)).concat(tokenize(transcriptData.lessonTitle || ''))
  );

  let bestPara = null;
  let maxMatches = 0;
  let hasSpecificKeywordMatch = false;

  for (const para of paragraphs) {
    const paraTokens = tokenize(para);
    let matches = 0;
    let paraHasKeyword = false;

    for (const w of queryWords) {
      if (paraTokens.includes(w)) {
        matches++;
        if (lessonKeywords.has(w)) {
          paraHasKeyword = true;
        }
      }
    }

    if (matches > maxMatches) {
      maxMatches = matches;
      bestPara = para;
      hasSpecificKeywordMatch = paraHasKeyword;
    }
  }

  // Require at least 2 content matches or 1 specific lesson keyword match
  if ((maxMatches >= 2 || hasSpecificKeywordMatch) && bestPara) {
    if (isTamil) {
      return `இந்த வீடியோ பாடத்தின்படி:\n\n${bestPara.trim()}`;
    }
    return `According to this video lesson's verified transcript:\n\n${bestPara.trim()}`;
  }

  return null;
};

/**
 * Main query function for AI Study Assistant.
 *
 * @param {Object} params
 * @param {string} params.question - The student's question
 * @param {string} params.courseId - Course identifier
 * @param {number|string} params.lessonId - Lesson number or ID
 * @param {string} [params.lessonTitle] - Lesson title fallback
 * @param {string} [params.language] - Student's preferred language ('ta' or 'en')
 * @param {Object} [params.activeLesson] - Currently active lesson object (for direct transcript check)
 * @returns {Promise<{ answer: string, isRelated: boolean, hasContext: boolean, source: string }>}
 */
export const askAIStudyAssistant = async ({
  question,
  courseId,
  lessonId,
  lessonTitle,
  language = 'ta',
  activeLesson = null
}) => {
  try {
    const normalizedLang = language === 'en' ? 'en' : 'ta';

    // 1. Validate question input
    if (!question || typeof question !== "string" || question.trim().length === 0) {
      return {
        answer: normalizedLang === 'ta'
          ? "தயவுசெய்து வீடியோவில் உள்ள பாடம் தொடர்பான கேள்வியை மட்டும் கேளுங்கள்."
          : "Please ask a question related to this video lesson.",
        isRelated: false,
        hasContext: true,
        source: "validation"
      };
    }

    const trimmedQuestion = question.trim();

    // 2. Retrieve verified transcript strictly for currently selected video lesson
    const transcriptData = getLessonTranscript(courseId, lessonId, activeLesson);

    // If transcript is missing, empty, or insufficient
    if (!transcriptData || !transcriptData.transcript || transcriptData.transcript.trim().length === 0) {
      return {
        answer: normalizedLang === 'ta' ? MISSING_CONTEXT_TAMIL : MISSING_CONTEXT_ENGLISH,
        isRelated: false,
        hasContext: false,
        source: "transcript_unavailable"
      };
    }

    // 3. Check for explicitly unrelated general knowledge domains (e.g. biology, recipes, cricket, movies)
    if (isExplicitlyUnrelated(trimmedQuestion)) {
      return {
        answer: normalizedLang === 'ta' ? UNRELATED_FALLBACK_TAMIL : UNRELATED_FALLBACK_ENGLISH,
        isRelated: false,
        hasContext: true,
        source: "scope_guard"
      };
    }

    // 4. Call Secure Backend Endpoint (/api/gemini-qa)
    // The Gemini API key is maintained securely on the backend server environment and NEVER in client code.
    try {
      if (typeof window !== "undefined" && window.fetch) {
        const backendRes = await fetch("/api/gemini-qa", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: trimmedQuestion,
            courseId,
            lessonId,
            lessonTitle: transcriptData.lessonTitle || lessonTitle,
            language: normalizedLang,
            transcript: transcriptData.transcript
          })
        });

        if (backendRes.ok) {
          const data = await backendRes.json();
          if (data && !data.fallbackToLocal && data.answer) {
            return {
              answer: data.answer,
              isRelated: Boolean(data.isRelated),
              hasContext: true,
              source: data.source || "gemini_api"
            };
          }
        }
      }
    } catch (backendErr) {
      console.warn("Backend Gemini AI proxy unavailable, proceeding with local verified transcript engine:", backendErr);
    }

    // 5. Local Verified Transcript Engine (offline / rate-limited fallback)
    const verifiedAnswer = extractAnswerFromTranscript(trimmedQuestion, transcriptData, normalizedLang);

    if (verifiedAnswer) {
      return {
        answer: verifiedAnswer,
        isRelated: true,
        hasContext: true,
        source: "verified_transcript"
      };
    }

    // If facts were not found in the transcript text
    return {
      answer: normalizedLang === 'ta' ? UNRELATED_FALLBACK_TAMIL : UNRELATED_FALLBACK_ENGLISH,
      isRelated: false,
      hasContext: true,
      source: "transcript_verification"
    };

  } catch (error) {
    console.error("AI Study Assistant error:", error);
    const normalizedLang = language === 'en' ? 'en' : 'ta';
    return {
      answer: normalizedLang === 'ta'
        ? "கேள்விக்கு பதிலளிப்பதில் எதிர்பாராத பிழை ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்."
        : "An unexpected error occurred while processing your question. Please try again.",
      isRelated: false,
      hasContext: false,
      source: "error_handler"
    };
  }
};
