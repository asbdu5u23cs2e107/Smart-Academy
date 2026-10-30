async function runHttpApiTests() {
  console.log("=================================================================");
  console.log(" TESTING /api/gemini-qa HTTP ENDPOINT VIA RUNNING DEV SERVER     ");
  console.log("=================================================================\n");

  const baseUrl = "http://localhost:5173/api/gemini-qa";
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

  async function postQa(body) {
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    return res.json();
  }

  // 1. Python Loops: English relevant
  const res1 = await postQa({
    question: "What is a for loop in Python?",
    courseId: "python",
    lessonId: 5,
    language: "en"
  });
  assert(
    "1. /api/gemini-qa answers English for loop question",
    res1.isRelated === true && res1.hasContext === true && res1.answer.toLowerCase().includes("loop"),
    `source: ${res1.source}, answer: ${res1.answer?.slice(0, 100)}`
  );

  // 2. Python Loops: Tamil relevant
  const res2 = await postQa({
    question: "லூப் என்றால் என்ன?",
    courseId: "python",
    lessonId: 5,
    language: "ta"
  });
  assert(
    "2. /api/gemini-qa answers Tamil loop question in Tamil",
    res2.isRelated === true && res2.hasContext === true && res2.answer.length > 20,
    `source: ${res2.source}, answer: ${res2.answer?.slice(0, 100)}`
  );

  // 3. Python Loops: Tanglish relevant
  const res3 = await postQa({
    question: "while loop eppadi work aagum?",
    courseId: "python",
    lessonId: 5,
    language: "ta"
  });
  assert(
    "3. /api/gemini-qa handles Tanglish question",
    res3.isRelated === true && res3.hasContext === true,
    `source: ${res3.source}, answer: ${res3.answer?.slice(0, 100)}`
  );

  // 4. Python Loops: English unrelated (photosynthesis)
  const res4 = await postQa({
    question: "What is photosynthesis?",
    courseId: "python",
    lessonId: 5,
    language: "en"
  });
  assert(
    "4. /api/gemini-qa rejects photosynthesis in English",
    res4.isRelated === false && res4.answer.includes("I couldn't find relevant information"),
    `source: ${res4.source}, answer: ${res4.answer}`
  );

  // 5. Python Loops: Tamil unrelated
  const res5 = await postQa({
    question: "ஒளிச்சேர்க்கை என்றால் என்ன?",
    courseId: "python",
    lessonId: 5,
    language: "ta"
  });
  assert(
    "5. /api/gemini-qa rejects unrelated question in Tamil",
    res5.isRelated === false && res5.answer.includes("இந்தக் கேள்விக்கு தற்போதைய வீடியோவில் தொடர்புடைய தகவல் கிடைக்கவில்லை"),
    `source: ${res5.source}, answer: ${res5.answer}`
  );

  // 6. Switch to HTML Lesson: Relevant HTML question
  const res6 = await postQa({
    question: "What are HTML5 semantic elements?",
    courseId: "fsd",
    lessonId: 2,
    language: "en"
  });
  assert(
    "6. /api/gemini-qa answers HTML question on HTML lesson",
    res6.isRelated === true && res6.hasContext === true && (res6.answer.includes("header") || res6.answer.includes("semantic")),
    `source: ${res6.source}, answer: ${res6.answer?.slice(0, 100)}`
  );

  // 7. HTML Lesson: Cross-video question (asking about Python Loops)
  const res7 = await postQa({
    question: "What is a for loop?",
    courseId: "fsd",
    lessonId: 2,
    language: "en"
  });
  assert(
    "7. /api/gemini-qa rejects Python question asked on HTML lesson",
    res7.isRelated === false && res7.answer.includes("I couldn't find relevant information"),
    `source: ${res7.source}, answer: ${res7.answer}`
  );

  // 8. Missing Transcript Lesson
  const res8 = await postQa({
    question: "What is covered in this video?",
    courseId: "unknown-course",
    lessonId: 99,
    language: "en"
  });
  assert(
    "8. /api/gemini-qa returns context unavailable when transcript is missing",
    res8.hasContext === false && res8.source === "missing_transcript" && res8.answer.includes("Verified transcript or content is not available"),
    `source: ${res8.source}, answer: ${res8.answer}`
  );

  console.log(`\n=================================================================`);
  console.log(` HTTP ENDPOINT RESULTS: ${passed}/${total} TESTS PASSED`);
  console.log(`=================================================================\n`);

  if (passed === total) {
    console.log("ALL HTTP ENDPOINT TESTS PASSED!");
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runHttpApiTests().catch((err) => {
  console.error("Endpoint test error:", err);
  process.exit(1);
});
