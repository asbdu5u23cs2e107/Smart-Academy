/**
 * Verification Test Suite for Gemini AI Video Doubt Assistant
 * 
 * Tests:
 * 1. Relevant question on active video (Python Loops) -> answers correctly (English & Tamil)
 * 2. Phrased differently and Tanglish question -> answers correctly
 * 3. Unrelated question on active video -> politely rejected in selected language
 * 4. Video switching -> switches to HTML lesson transcript (verifies own transcript is used)
 * 5. Cross-video question (asking about Python Loops on HTML lesson) -> rejected
 * 6. Machine Learning video switching -> verifies ML transcript is used
 * 7. Missing transcript scenario -> reports context unavailable, NOT unrelated
 * 8. Imported / custom transcript scenario -> correctly uses imported transcript
 */

import {
  askAIStudyAssistant,
  getLessonTranscript,
  importLessonTranscript,
  UNRELATED_FALLBACK_TAMIL,
  UNRELATED_FALLBACK_ENGLISH,
  MISSING_CONTEXT_TAMIL,
  MISSING_CONTEXT_ENGLISH
} from '../src/services/aiStudyAssistant.js';

async function runTestSuite() {
  console.log("=================================================================");
  console.log(" RUNNING GEMINI AI VIDEO DOUBT ASSISTANT VERIFICATION SUITE      ");
  console.log("=================================================================\n");

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

  // -------------------------------------------------------------------------
  // TEST SET 1: Python Loops (Lesson 5) - English & Tamil & Tanglish
  // -------------------------------------------------------------------------
  console.log("--- 1. Testing Video 1: Python Loops (Lesson 5) ---");

  // 1.1 English Relevant
  const res1 = await askAIStudyAssistant({
    question: "What is a for loop?",
    courseId: "python",
    lessonId: 5,
    language: "en"
  });
  assert(
    "1.1 English relevant question answered correctly",
    res1.isRelated === true && res1.hasContext === true && res1.answer.toLowerCase().includes("loop"),
    `Got isRelated=${res1.isRelated}, answer=${res1.answer.slice(0, 100)}`
  );

  // 1.2 English Relevant (Phrased differently: avoiding infinite loops)
  const res2 = await askAIStudyAssistant({
    question: "How do I avoid an infinite loop in a while loop?",
    courseId: "python",
    lessonId: 5,
    language: "en"
  });
  assert(
    "1.2 English question with different phrasing answered correctly",
    res2.isRelated === true && res2.hasContext === true && (res2.answer.toLowerCase().includes("condition") || res2.answer.toLowerCase().includes("counter")),
    `Got isRelated=${res2.isRelated}, answer=${res2.answer.slice(0, 100)}`
  );

  // 1.3 Tamil Relevant (லூப் என்றால் என்ன?)
  const res3 = await askAIStudyAssistant({
    question: "லூப் என்றால் என்ன?",
    courseId: "python",
    lessonId: 5,
    language: "ta"
  });
  assert(
    "1.3 Tamil relevant question answered in Tamil correctly",
    res3.isRelated === true && res3.hasContext === true && res3.answer.length > 30 && res3.answer !== UNRELATED_FALLBACK_TAMIL,
    `Got isRelated=${res3.isRelated}, answer=${res3.answer.slice(0, 100)}`
  );

  // 1.4 Tanglish Relevant (while loop eppadi work aagum?)
  const res4 = await askAIStudyAssistant({
    question: "while loop eppadi work aagum?",
    courseId: "python",
    lessonId: 5,
    language: "ta"
  });
  assert(
    "1.4 Tanglish relevant question understood and answered",
    res4.isRelated === true && res4.hasContext === true && res4.answer !== UNRELATED_FALLBACK_TAMIL,
    `Got isRelated=${res4.isRelated}, answer=${res4.answer.slice(0, 100)}`
  );

  // 1.5 English Unrelated (Photosynthesis)
  const res5 = await askAIStudyAssistant({
    question: "What is photosynthesis?",
    courseId: "python",
    lessonId: 5,
    language: "en"
  });
  assert(
    "1.5 English unrelated question politely rejected",
    res5.isRelated === false && (res5.answer === UNRELATED_FALLBACK_ENGLISH || res5.answer.includes(UNRELATED_FALLBACK_ENGLISH)),
    `Got isRelated=${res5.isRelated}, answer=${res5.answer}`
  );

  // 1.6 Tamil Unrelated (ஒளிச்சேர்க்கை என்றால் என்ன?)
  const res6 = await askAIStudyAssistant({
    question: "ஒளிச்சேர்க்கை என்றால் என்ன?",
    courseId: "python",
    lessonId: 5,
    language: "ta"
  });
  assert(
    "1.6 Tamil unrelated question politely rejected in Tamil",
    res6.isRelated === false && (res6.answer === UNRELATED_FALLBACK_TAMIL || res6.answer.includes(UNRELATED_FALLBACK_TAMIL)),
    `Got isRelated=${res6.isRelated}, answer=${res6.answer}`
  );

  // -------------------------------------------------------------------------
  // TEST SET 2: Video Switching & Isolation - Switch to HTML Lesson (FSD Lesson 2)
  // -------------------------------------------------------------------------
  console.log("\n--- 2. Testing Video Switching: HTML Basics (FSD Lesson 2) ---");

  // Verify transcript retrieved is specifically HTML, NOT Python Loops
  const htmlTranscript = getLessonTranscript("fsd", 2);
  assert(
    "2.1 HTML lesson has verified transcript covering HTML5 semantics",
    htmlTranscript && htmlTranscript.transcript.toLowerCase().includes("semantic"),
    `Transcript: ${htmlTranscript?.transcript?.slice(0, 80)}`
  );

  // 2.2 Relevant question about HTML
  const resHtml = await askAIStudyAssistant({
    question: "What are HTML5 semantic elements?",
    courseId: "fsd",
    lessonId: 2,
    language: "en"
  });
  assert(
    "2.2 HTML lesson answers HTML question correctly from its own transcript",
    resHtml.isRelated === true && resHtml.hasContext === true && (resHtml.answer.includes("header") || resHtml.answer.includes("semantic")),
    `Got isRelated=${resHtml.isRelated}, answer=${resHtml.answer.slice(0, 100)}`
  );

  // 2.3 Cross-video question: asking about for loops on HTML lesson
  const resCross = await askAIStudyAssistant({
    question: "What is a for loop in Python?",
    courseId: "fsd",
    lessonId: 2,
    language: "en"
  });
  assert(
    "2.3 Asking about Python Loops while watching HTML video is rejected as unrelated",
    resCross.isRelated === false && (resCross.answer === UNRELATED_FALLBACK_ENGLISH || resCross.answer.includes(UNRELATED_FALLBACK_ENGLISH)),
    `Got isRelated=${resCross.isRelated}, answer=${resCross.answer}`
  );

  // -------------------------------------------------------------------------
  // TEST SET 3: Switch to Machine Learning (ML Lesson 1)
  // -------------------------------------------------------------------------
  console.log("\n--- 3. Testing Course & Video Switching: Machine Learning (ML Lesson 1) ---");

  const mlTranscript = getLessonTranscript("ml", 1);
  assert(
    "3.1 ML Lesson 1 uses its own transcript (supervised/unsupervised) and not FSD",
    mlTranscript && mlTranscript.transcript.toLowerCase().includes("supervised") && !mlTranscript.transcript.toLowerCase().includes("html"),
    `Transcript: ${mlTranscript?.transcript?.slice(0, 80)}`
  );

  const resML = await askAIStudyAssistant({
    question: "What is the difference between supervised and unsupervised learning?",
    courseId: "ml",
    lessonId: 1,
    language: "en"
  });
  assert(
    "3.2 ML question answered accurately from ML transcript",
    resML.isRelated === true && resML.hasContext === true && (resML.answer.toLowerCase().includes("labeled") || resML.answer.toLowerCase().includes("unsupervised")),
    `Got isRelated=${resML.isRelated}, answer=${resML.answer.slice(0, 100)}`
  );

  const resMLTamil = await askAIStudyAssistant({
    question: "Supervised vs Unsupervised வேறுபாடு என்ன?",
    courseId: "ml",
    lessonId: 1,
    language: "ta"
  });
  assert(
    "3.3 ML question in Tamil answered accurately in Tamil",
    resMLTamil.isRelated === true && resMLTamil.hasContext === true && resMLTamil.answer !== UNRELATED_FALLBACK_TAMIL,
    `Got isRelated=${resMLTamil.isRelated}, answer=${resMLTamil.answer.slice(0, 100)}`
  );

  // -------------------------------------------------------------------------
  // TEST SET 4: Missing Transcript Handling (Requirement 7)
  // -------------------------------------------------------------------------
  console.log("\n--- 4. Testing Missing Transcript Handling ---");

  // Query a non-existent lesson on an unconfigured course ID
  const resMissing = await askAIStudyAssistant({
    question: "What does this video teach?",
    courseId: "unknown-course-xyz",
    lessonId: 99,
    language: "en"
  });
  assert(
    "4.1 Missing transcript returns context unavailable message, NOT unrelated rejection",
    resMissing.hasContext === false && resMissing.isRelated === false && resMissing.answer === MISSING_CONTEXT_ENGLISH && resMissing.source === "transcript_unavailable",
    `Got source=${resMissing.source}, answer=${resMissing.answer}`
  );

  const resMissingTamil = await askAIStudyAssistant({
    question: "இந்த வீடியோவில் என்ன பாடம்?",
    courseId: "unknown-course-xyz",
    lessonId: 99,
    language: "ta"
  });
  assert(
    "4.2 Missing transcript in Tamil returns Tamil context unavailable message",
    resMissingTamil.hasContext === false && resMissingTamil.isRelated === false && resMissingTamil.answer === MISSING_CONTEXT_TAMIL && resMissingTamil.source === "transcript_unavailable",
    `Got source=${resMissingTamil.source}, answer=${resMissingTamil.answer}`
  );

  // -------------------------------------------------------------------------
  // TEST SET 5: Dynamic / Imported Transcript Support (Requirement 3)
  // -------------------------------------------------------------------------
  console.log("\n--- 5. Testing Imported Transcript Method ---");

  const customTranscript = `Welcome to Docker and Containerization Masterclass.
In this lesson, we learn about Docker containers, images, and Dockerfiles.
A Docker container is a lightweight, standalone, executable package that includes everything needed to run an application.
The Dockerfile uses instructions like FROM, WORKDIR, COPY, RUN, and CMD.`;

  importLessonTranscript({
    courseId: "devops-custom",
    lessonId: 1,
    videoId: "docker-test-123",
    transcript: customTranscript,
    lessonTitle: "Docker Fundamentals",
    topic: "Containers, Images, and Dockerfiles"
  });

  const importedRetrieved = getLessonTranscript("devops-custom", 1);
  assert(
    "5.1 Imported transcript is successfully registered and retrieved",
    importedRetrieved && importedRetrieved.transcript.includes("Docker container is a lightweight"),
    `Retrieved: ${importedRetrieved?.transcript?.slice(0, 60)}`
  );

  const resImported = await askAIStudyAssistant({
    question: "What is a Docker container?",
    courseId: "devops-custom",
    lessonId: 1,
    language: "en"
  });
  assert(
    "5.2 AI Doubt Assistant answers questions based on the imported transcript",
    resImported.isRelated === true && resImported.hasContext === true && resImported.answer.toLowerCase().includes("container"),
    `Got isRelated=${resImported.isRelated}, answer=${resImported.answer.slice(0, 100)}`
  );

  // -------------------------------------------------------------------------
  // SUMMARY
  // -------------------------------------------------------------------------
  console.log(`\n=================================================================`);
  console.log(` RESULTS: ${passed}/${total} TESTS PASSED`);
  console.log(`=================================================================\n`);

  if (passed === total) {
    console.log("ALL GEMINI AI VIDEO DOUBT ASSISTANT TESTS PASSED SUCCESSFULLY!");
    process.exit(0);
  } else {
    console.error("SOME TESTS FAILED.");
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error("Fatal test runner error:", err);
  process.exit(1);
});
