// Test to verify video mappings and paths across all topics
import { readFileSync } from 'fs';

function runVideoTests() {
  console.log("=== VERIFYING VIDEO MAPPINGS ACROSS ALL TOPICS ===\n");
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

  // 1. Inspect CourseLearning.jsx
  const courseLearningContent = readFileSync('src/pages/CourseLearning.jsx', 'utf-8');

  // Verify Python keeps existing video
  assert(
    "Python lessons keep existing video 'Js05B8Z1ivE'",
    courseLearningContent.includes("https://www.youtube.com/embed/Js05B8Z1ivE")
  );

  // Verify FSD lessons do NOT show Python video for every topic
  assert(
    "FSD Lesson 1 (Full Stack) has dedicated video URL",
    courseLearningContent.includes("https://www.youtube.com/embed/pQN-pnXPaVg")
  );
  assert(
    "FSD Lesson 2 (HTML) has dedicated video URL",
    courseLearningContent.includes("https://www.youtube.com/embed/kUMe1FH4CHE")
  );
  assert(
    "FSD Lesson 3 (CSS) has dedicated video URL",
    courseLearningContent.includes("https://www.youtube.com/embed/fYq5PXgSsbE")
  );
  assert(
    "FSD Lesson 4 (JavaScript) has dedicated video URL",
    courseLearningContent.includes("https://www.youtube.com/embed/W6NZfCO5SIk")
  );
  assert(
    "FSD Lesson 5 (React) has dedicated video URL",
    courseLearningContent.includes("https://www.youtube.com/embed/bMknfKXIFA8")
  );
  assert(
    "FSD Lesson 6 (Node.js) has dedicated video URL",
    courseLearningContent.includes("https://www.youtube.com/embed/Oe421EPjeBE")
  );

  // Verify Fallback message for lessons without video
  assert(
    "Fallback message exists when a lesson genuinely has no video",
    courseLearningContent.includes("No video available for this lesson.")
  );

  // 2. Inspect StudentDashboard/Videos.jsx
  const videosContent = readFileSync('src/pages/StudentDashboard/Videos.jsx', 'utf-8');

  assert(
    "Videos.jsx includes 'Python' in topics list",
    videosContent.includes("'Python'")
  );
  assert(
    "Videos.jsx links HTML lessons with ?lesson=2",
    videosContent.includes("/course/fsd/learn?lesson=2")
  );
  assert(
    "Videos.jsx links CSS lessons with ?lesson=3",
    videosContent.includes("/course/fsd/learn?lesson=3")
  );
  assert(
    "Videos.jsx links JS lessons with ?lesson=4",
    videosContent.includes("/course/fsd/learn?lesson=4")
  );
  assert(
    "Videos.jsx links React lessons with ?lesson=5",
    videosContent.includes("/course/fsd/learn?lesson=5")
  );
  assert(
    "Videos.jsx links Node lessons with ?lesson=6",
    videosContent.includes("/course/fsd/learn?lesson=6")
  );
  assert(
    "Videos.jsx links Python lessons with /course/python/learn",
    videosContent.includes("/course/python/learn?lesson=1")
  );

  // 3. Inspect AIStudyAssistant.jsx
  const assistantContent = readFileSync('src/components/AIStudyAssistant.jsx', 'utf-8');

  assert(
    "Button label is explicitly 'Ask Gemini AI'",
    assistantContent.includes("Ask Gemini AI")
  );

  console.log(`\n=== RESULTS: ${passed}/${total} TESTS PASSED ===\n`);
  if (passed === total) {
    console.log("ALL VIDEO MAPPING & GEMINI AI TESTS PASSED!");
  } else {
    process.exit(1);
  }
}

runVideoTests();
