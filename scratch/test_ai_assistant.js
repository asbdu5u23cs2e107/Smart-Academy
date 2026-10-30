// Comprehensive automated verification test for Videos and Gemini AI Question Answering
import {
  askAIStudyAssistant,
  UNRELATED_QUESTION_RESPONSE,
  MISSING_INFO_RESPONSE,
  CONTEXT_UNAVAILABLE_RESPONSE
} from '../src/services/aiStudyAssistant.js';
import { getLessonTranscript, normalizeCourseKey } from '../src/data/videoTranscripts.js';

async function runTests() {
  console.log("==================================================");
  console.log("  SMART ACADEMY: VIDEO & GEMINI AI VERIFICATION  ");
  console.log("==================================================\n");

  let passed = 0;
  let total = 0;

  function assert(testName, condition, details = "") {
    total++;
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName} - ${details}`);
    }
  }

  // PART 1: Transcript & Video Data Verification
  console.log("\n--- PART 1: Transcripts & Course Mapping ---");

  const pyIntro = getLessonTranscript("python", 1);
  assert(
    "Python Lesson 1 transcript exists",
    pyIntro && pyIntro.lessonTitle.includes("Python Introduction")
  );

  const pyLoops = getLessonTranscript("python", 5);
  assert(
    "Python Lesson 5 transcript covers loops and range",
    pyLoops && pyLoops.transcript.includes("for loop") && pyLoops.transcript.includes("range()")
  );

  const fsdHtml = getLessonTranscript("fsd", 2);
  assert(
    "FSD Lesson 2 transcript covers HTML semantic elements",
    fsdHtml && fsdHtml.transcript.includes("<header>") && fsdHtml.transcript.includes("semantic")
  );

  const fsdCss = getLessonTranscript("fsd", 3);
  assert(
    "FSD Lesson 3 transcript covers Flexbox and Grid",
    fsdCss && fsdCss.transcript.includes("Flexbox") && fsdCss.transcript.includes("CSS Grid")
  );

  const fsdJs = getLessonTranscript("fsd", 4);
  assert(
    "FSD Lesson 4 transcript covers JS and DOM events",
    fsdJs && fsdJs.transcript.includes("addEventListener")
  );

  const fsdReact = getLessonTranscript("fsd", 5);
  assert(
    "FSD Lesson 5 transcript covers React useState hook",
    fsdReact && fsdReact.transcript.includes("useState")
  );

  const fsdNode = getLessonTranscript("fsd", 6);
  assert(
    "FSD Lesson 6 transcript covers Express REST API",
    fsdNode && fsdNode.transcript.includes("Express") && fsdNode.transcript.includes("RESTful")
  );

  assert(
    "Course key normalizer maps 'python-fs' to 'python'",
    normalizeCourseKey("python-fs") === "python"
  );

  assert(
    "Course key normalizer maps 'react-js' to 'react-js'",
    normalizeCourseKey("react-js") === "react-js"
  );

  // PART 2: Unrelated Question Rejection (Exact Tamil Message)
  console.log("\n--- PART 2: Unrelated Question Rejection (Exact Tamil Guardrail) ---");

  const expectedUnrelated = "இந்தக் கேள்வி தற்போதைய வீடியோவுடன் தொடர்புடையது அல்ல. தயவுசெய்து வீடியோவில் உள்ள பாடம் தொடர்பான கேள்வியை மட்டும் கேளுங்கள்.";
  assert(
    "Constant UNRELATED_QUESTION_RESPONSE matches exact requirement",
    UNRELATED_QUESTION_RESPONSE === expectedUnrelated
  );

  const resUnrelated1 = await askAIStudyAssistant({
    question: "What is photosynthesis?",
    courseId: "python",
    lessonId: 5,
    lessonTitle: "Python Loops"
  });
  assert(
    "Rejects 'What is photosynthesis?' with exact Tamil message",
    resUnrelated1.answer === expectedUnrelated,
    `Received: "${resUnrelated1.answer}"`
  );

  const resUnrelated2 = await askAIStudyAssistant({
    question: "Tell me about the solar system",
    courseId: "fsd",
    lessonId: 3,
    lessonTitle: "CSS Layouts: Flexbox vs. Grid"
  });
  assert(
    "Rejects 'Tell me about the solar system' with exact Tamil message",
    resUnrelated2.answer === expectedUnrelated,
    `Received: "${resUnrelated2.answer}"`
  );

  const resUnrelatedTamil = await askAIStudyAssistant({
    question: "போட்டோசிந்தசிஸ் என்றால் என்ன?",
    courseId: "python",
    lessonId: 5,
    lessonTitle: "Python Loops"
  });
  assert(
    "Rejects Tamil unrelated question 'போட்டோசிந்தசிஸ் என்றால் என்ன?' with exact Tamil message",
    resUnrelatedTamil.answer === expectedUnrelated,
    `Received: "${resUnrelatedTamil.answer}"`
  );

  const resUnrelatedCricket = await askAIStudyAssistant({
    question: "Who won the cricket world cup?",
    courseId: "fsd",
    lessonId: 2,
    lessonTitle: "HTML Basics & Markup Structures"
  });
  assert(
    "Rejects 'Who won the cricket world cup?' with exact Tamil message",
    resUnrelatedCricket.answer === expectedUnrelated,
    `Received: "${resUnrelatedCricket.answer}"`
  );

  // PART 3: Related but Missing Information (Exact Tamil Message)
  console.log("\n--- PART 3: Missing Information from Transcript (Exact Tamil Guardrail) ---");

  const expectedMissing = "இந்தக் கேள்விக்கான பதில் தற்போதைய வீடியோவில் கிடைக்கவில்லை. வீடியோவில் உள்ள தகவல்களை மட்டும் வைத்து என்னால் பதிலளிக்க முடியும்.";
  assert(
    "Constant MISSING_INFO_RESPONSE matches exact requirement",
    MISSING_INFO_RESPONSE === expectedMissing
  );

  const resMissing1 = await askAIStudyAssistant({
    question: "What is a generator function in Python?",
    courseId: "python",
    lessonId: 5,
    lessonTitle: "Python Loops"
  });
  assert(
    "Rejects generator function on Loops video with exact missing info message",
    resMissing1.answer === expectedMissing,
    `Received: "${resMissing1.answer}"`
  );

  const resMissing2 = await askAIStudyAssistant({
    question: "How do I configure MongoDB database connections?",
    courseId: "fsd",
    lessonId: 2,
    lessonTitle: "HTML Basics & Markup Structures"
  });
  assert(
    "Rejects database question on HTML video with exact missing info message",
    resMissing2.answer === expectedMissing,
    `Received: "${resMissing2.answer}"`
  );

  // PART 4: Verified Answers for Relevant Questions (English & Tamil)
  console.log("\n--- PART 4: Verified Answers from Transcript (English & Tamil) ---");

  // English: For Loop on Lesson 5
  const resForLoop = await askAIStudyAssistant({
    question: "What is a for loop?",
    courseId: "python",
    lessonId: 5,
    lessonTitle: "Python Loops"
  });
  assert(
    "Answers 'What is a for loop?' from verified transcript",
    resForLoop.isRelated === true && resForLoop.answer.includes("for loop") && resForLoop.answer.includes("sequence"),
    `Received: "${resForLoop.answer}"`
  );

  // English: While Loop on Lesson 5
  const resWhileLoop = await askAIStudyAssistant({
    question: "What is a while loop?",
    courseId: "python",
    lessonId: 5,
    lessonTitle: "Python Loops"
  });
  assert(
    "Answers 'What is a while loop?' from verified transcript",
    resWhileLoop.isRelated === true && resWhileLoop.answer.includes("while loop") && resWhileLoop.answer.includes("condition"),
    `Received: "${resWhileLoop.answer}"`
  );

  // English: Break statement on Lesson 5
  const resBreak = await askAIStudyAssistant({
    question: "What does the break statement do?",
    courseId: "python",
    lessonId: 5,
    lessonTitle: "Python Loops"
  });
  assert(
    "Answers 'What does the break statement do?' from verified transcript",
    resBreak.isRelated === true && resBreak.answer.includes("break"),
    `Received: "${resBreak.answer}"`
  );

  // Tamil: For Loop question
  const resTamilLoop = await askAIStudyAssistant({
    question: "for loop என்றால் என்ன?",
    courseId: "python",
    lessonId: 5,
    lessonTitle: "Python Loops"
  });
  assert(
    "Answers 'for loop என்றால் என்ன?' in Tamil grounded in transcript",
    resTamilLoop.isRelated === true && resTamilLoop.answer.includes("இந்த வீடியோ பாடத்தின்படி") && resTamilLoop.answer.includes("for loop"),
    `Received: "${resTamilLoop.answer}"`
  );

  // Tamil: Break statement question
  const resTamilBreak = await askAIStudyAssistant({
    question: "break கூற்று என்ன செய்கிறது?",
    courseId: "python",
    lessonId: 5,
    lessonTitle: "Python Loops"
  });
  assert(
    "Answers 'break கூற்று என்ன செய்கிறது?' in Tamil grounded in transcript",
    resTamilBreak.isRelated === true && resTamilBreak.answer.includes("break"),
    `Received: "${resTamilBreak.answer}"`
  );

  // FSD Lesson 2: HTML5 Semantic Elements
  const resHtml = await askAIStudyAssistant({
    question: "What are HTML5 semantic elements?",
    courseId: "fsd",
    lessonId: 2,
    lessonTitle: "HTML Basics & Markup Structures"
  });
  assert(
    "Answers 'What are HTML5 semantic elements?' from HTML transcript",
    resHtml.isRelated === true && (resHtml.answer.includes("semantic") || resHtml.answer.includes("<header>")),
    `Received: "${resHtml.answer}"`
  );

  // FSD Lesson 3: CSS Flexbox vs Grid
  const resCss = await askAIStudyAssistant({
    question: "What is the difference between Flexbox and Grid?",
    courseId: "fsd",
    lessonId: 3,
    lessonTitle: "CSS Layouts: Flexbox vs. Grid"
  });
  assert(
    "Answers 'What is the difference between Flexbox and Grid?' from CSS transcript",
    resCss.isRelated === true && (resCss.answer.includes("Flexbox") || resCss.answer.includes("Grid")),
    `Received: "${resCss.answer}"`
  );

  // PART 5: Context Switching Between Videos
  console.log("\n--- PART 5: Dynamic Context Switching ---");

  // Asking about for loop on Lesson 1 (Python Introduction) -> should NOT answer loop details since it's in Lesson 5!
  const resContextSwitch1 = await askAIStudyAssistant({
    question: "How does a while loop work?",
    courseId: "python",
    lessonId: 1,
    lessonTitle: "Python Introduction"
  });
  assert(
    "Context switch: Asking about while loop on Lesson 1 (Intro) triggers missing info message",
    resContextSwitch1.answer === expectedMissing,
    `Received: "${resContextSwitch1.answer}"`
  );

  // Asking about for loop on Lesson 5 (Python Loops) -> should answer!
  const resContextSwitch2 = await askAIStudyAssistant({
    question: "How does a while loop work?",
    courseId: "python",
    lessonId: 5,
    lessonTitle: "Python Loops"
  });
  assert(
    "Context switch: Asking about while loop on Lesson 5 (Loops) yields verified answer",
    resContextSwitch2.isRelated === true && resContextSwitch2.answer.includes("while loop"),
    `Received: "${resContextSwitch2.answer}"`
  );

  // Missing transcript on nonexistent lesson
  const resNoTranscript = await askAIStudyAssistant({
    question: "What is this lesson?",
    courseId: "python",
    lessonId: 9999,
    lessonTitle: "Unknown Video"
  });
  assert(
    "Lesson without transcript returns clear context unavailable message",
    resNoTranscript.answer === CONTEXT_UNAVAILABLE_RESPONSE,
    `Received: "${resNoTranscript.answer}"`
  );

  console.log(`\n==================================================`);
  console.log(`  SUMMARY: ${passed} / ${total} TESTS PASSED`);
  console.log(`==================================================`);

  if (passed === total) {
    console.log("\n>>> ALL TESTS PASSED SUCCESSFULLY! <<<\n");
    process.exit(0);
  } else {
    console.error(`\n>>> ${total - passed} TESTS FAILED <<<\n`);
    process.exit(1);
  }
}

runTests();
