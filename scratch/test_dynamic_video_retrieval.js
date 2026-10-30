/**
 * Verification Test Suite for Dynamic Educational Video Retrieval & Course Sync
 * Tests:
 * 1. Java Developer
 * 2. Python Full Stack
 * 3. Web Development
 * 4. Machine Learning
 * 5. Data Science
 * 6. Newly Created Custom Course (Admin to Student Sync)
 * 7. Verification that no course silently falls back to Python Full Stack videos
 * 8. Cache isolation and clean course switching
 */

import {
  getCourseLessonsWithVideos,
  detectCourseDomain,
  buildVideoSearchQuery,
  EDUCATIONAL_VIDEO_LIBRARY
} from '../src/services/videoRetrievalService.js';

import {
  getAllCourses,
  getCourseById,
  saveCustomCourse,
  deleteCustomCourse,
  generateSyllabusForCourse
} from '../src/services/courseRepository.js';

async function runDynamicVideoTests() {
  console.log("=================================================================");
  console.log(" RUNNING DYNAMIC VIDEO RETRIEVAL & COURSE SYNCHRONIZATION TESTS  ");
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

  // -------------------------------------------------------------
  // TEST 1: Java Developer Video Retrieval
  // -------------------------------------------------------------
  console.log("--- 1. Testing Java Developer ---");
  const javaCourse = getCourseById('java');
  assert("Java Developer course resolves correctly", javaCourse && javaCourse.title.toLowerCase().includes('java'));

  const javaDomain = detectCourseDomain(javaCourse);
  assert("Java domain is correctly identified as 'java'", javaDomain === 'java');

  const javaVideos = await getCourseLessonsWithVideos(javaCourse);
  assert("Java course retrieves real lessons with videos", javaVideos.lessons.length >= 5);

  const javaHasPythonVideo = javaVideos.lessons.some(l => l.videoUrl && l.videoUrl.includes('Js05B8Z1ivE'));
  assert("Java Developer does NOT silently fall back to Python videos", !javaHasPythonVideo);

  const javaHasRealEmbed = javaVideos.lessons.every(l => l.videoUrl && l.videoUrl.startsWith('https://www.youtube.com/embed/'));
  assert("All Java lessons have real, playable YouTube embed URLs", javaHasRealEmbed);
  assert("Java Lesson 1 covers Java Basics", javaVideos.lessons[0].title.toLowerCase().includes('java'));

  // -------------------------------------------------------------
  // TEST 2: Python Full Stack Video Retrieval
  // -------------------------------------------------------------
  console.log("\n--- 2. Testing Python Full Stack ---");
  const pythonCourse = getCourseById('python');
  assert("Python course resolves correctly", pythonCourse && pythonCourse.title.toLowerCase().includes('python'));

  const pythonDomain = detectCourseDomain(pythonCourse);
  assert("Python domain is correctly identified as 'python'", pythonDomain === 'python');

  const pythonVideos = await getCourseLessonsWithVideos(pythonCourse);
  assert("Python course retrieves real lessons with videos", pythonVideos.lessons.length >= 6);

  const pythonHasRealEmbed = pythonVideos.lessons.every(l => l.videoUrl && l.videoUrl.startsWith('https://www.youtube.com/embed/'));
  assert("All Python lessons have real, playable YouTube embed URLs", pythonHasRealEmbed);

  // -------------------------------------------------------------
  // TEST 3: Web Development Video Retrieval
  // -------------------------------------------------------------
  console.log("\n--- 3. Testing Web Development ---");
  const webCourse = getCourseById('fsd');
  assert("Web Development (FSD) course resolves correctly", webCourse && (webCourse.title.toLowerCase().includes('full stack') || webCourse.title.toLowerCase().includes('web')));

  const webDomain = detectCourseDomain(webCourse);
  assert("Web Development domain is correctly identified as 'web'", webDomain === 'web');

  const webVideos = await getCourseLessonsWithVideos(webCourse);
  assert("Web Development retrieves structured lessons", webVideos.lessons.length >= 6);

  const webHasHtml = webVideos.lessons.some(l => l.title.toLowerCase().includes('html'));
  const webHasCss = webVideos.lessons.some(l => l.title.toLowerCase().includes('css'));
  const webHasJs = webVideos.lessons.some(l => l.title.toLowerCase().includes('javascript'));
  const webHasReact = webVideos.lessons.some(l => l.title.toLowerCase().includes('react'));
  const webHasNode = webVideos.lessons.some(l => l.title.toLowerCase().includes('node'));
  assert("Web Development lessons cover HTML, CSS, JS, React, and Node", webHasHtml && webHasCss && webHasJs && webHasReact && webHasNode);

  // -------------------------------------------------------------
  // TEST 4: Machine Learning Video Retrieval
  // -------------------------------------------------------------
  console.log("\n--- 4. Testing Machine Learning ---");
  const mlCourse = getCourseById('ai');
  assert("Machine Learning / AI course resolves correctly", mlCourse && (mlCourse.title.toLowerCase().includes('intelligence') || mlCourse.title.toLowerCase().includes('machine learning')));

  const mlDomain = detectCourseDomain(mlCourse);
  assert("Machine Learning domain is correctly identified as 'ml'", mlDomain === 'ml');

  const mlVideos = await getCourseLessonsWithVideos(mlCourse);
  assert("Machine Learning retrieves real lessons with videos", mlVideos.lessons.length >= 4);

  const mlHasPythonVideo = mlVideos.lessons.some(l => l.videoUrl && l.videoUrl.includes('Js05B8Z1ivE'));
  assert("Machine Learning does NOT fall back to Python Full Stack videos", !mlHasPythonVideo);

  const mlHasRealEmbed = mlVideos.lessons.every(l => l.videoUrl && l.videoUrl.startsWith('https://www.youtube.com/embed/'));
  assert("Machine Learning lessons have real, playable YouTube embed URLs", mlHasRealEmbed);

  // -------------------------------------------------------------
  // TEST 5: Data Science Video Retrieval
  // -------------------------------------------------------------
  console.log("\n--- 5. Testing Data Science ---");
  const dsCourse = getCourseById('sql');
  const dsDomain = detectCourseDomain({ title: 'Data Science Masterclass', category: 'Data Science' });
  assert("Data Science domain is correctly identified as 'datascience'", dsDomain === 'datascience');

  const dsVideos = await getCourseLessonsWithVideos({ id: 'data-science', title: 'Data Science Masterclass', category: 'Data Science' });
  assert("Data Science retrieves distinct data analytics lessons", dsVideos.lessons.length >= 5);
  const dsHasPandas = dsVideos.lessons.some(l => l.title.toLowerCase().includes('pandas') || l.topic.toLowerCase().includes('pandas'));
  assert("Data Science lessons cover Pandas and analytical topics", dsHasPandas);

  // -------------------------------------------------------------
  // TEST 6: Newly Created Custom Course (Admin & Student Synchronization)
  // -------------------------------------------------------------
  console.log("\n--- 6. Testing Newly Created Custom Course ---");
  const customCourseId = `custom-test-course-${Date.now()}`;
  const customCourse = saveCustomCourse({
    id: customCourseId,
    courseId: customCourseId,
    title: 'Cloud DevOps and Docker Engineering',
    category: 'Cloud Computing',
    trainer: 'Senior Cloud Architect',
    duration: '4 Months',
    price: 32000,
    description: 'Learn containerization, CI/CD, Docker, and Kubernetes.',
    syllabus: 'Docker Fundamentals, Container Orchestration with Kubernetes, CI/CD Pipeline Automation, Cloud Monitoring'
  });

  assert("Custom course was saved successfully by Admin", customCourse && customCourse.id === customCourseId);

  // Verify Student can access this newly created course
  const studentFetched = getCourseById(customCourseId);
  assert("Student repository immediately reflects Admin-created course", studentFetched && studentFetched.id === customCourseId);
  assert("Student sees matching title and description", studentFetched.title === 'Cloud DevOps and Docker Engineering');

  // Verify dynamic video retrieval for this custom course
  const customVideos = await getCourseLessonsWithVideos(customCourse);
  assert("Custom course retrieves relevant lessons without crash", customVideos.lessons.length >= 4);

  const customHasPythonFallback = customVideos.lessons.some(l => l.videoUrl && l.videoUrl.includes('Js05B8Z1ivE'));
  assert("Custom course does NOT fall back to Python Full Stack videos", !customHasPythonFallback);

  // Clean up test custom course
  deleteCustomCourse(customCourseId);
  assert("Custom course can be deleted cleanly", !getCourseById(customCourseId).isCustom);

  // -------------------------------------------------------------
  // TEST 7: Clean Course Switching & Non-Interference
  // -------------------------------------------------------------
  console.log("\n--- 7. Testing Course Switching & Video Isolation ---");
  const runJava = await getCourseLessonsWithVideos(getCourseById('java'));
  const runPython = await getCourseLessonsWithVideos(getCourseById('python'));
  const runML = await getCourseLessonsWithVideos(getCourseById('ai'));

  const javaVid = runJava.lessons[0].videoUrl;
  const pythonVid = runPython.lessons[0].videoUrl;
  const mlVid = runML.lessons[0].videoUrl;

  assert("Java and Python lesson 1 video URLs are completely different", javaVid !== pythonVid);
  assert("Java and ML lesson 1 video URLs are completely different", javaVid !== mlVid);
  assert("Python and ML lesson 1 video URLs are completely different", pythonVid !== mlVid);

  // -------------------------------------------------------------
  // TEST 8: Query Builder Verification
  // -------------------------------------------------------------
  console.log("\n--- 8. Testing Query Builder ---");
  const query = buildVideoSearchQuery({ title: 'Java Developer', category: 'Programming' }, 'Object Oriented Programming');
  assert("Query builder includes course name and lesson topic", query.includes('Java Developer') && query.includes('Object Oriented Programming'));

  console.log(`\n=================================================================`);
  console.log(` RESULTS: ${passed}/${total} TESTS PASSED`);
  console.log(`=================================================================\n`);

  if (passed === total) {
    console.log("ALL DYNAMIC VIDEO RETRIEVAL & SYNCHRONIZATION TESTS PASSED!");
    process.exit(0);
  } else {
    console.error("SOME TESTS FAILED.");
    process.exit(1);
  }
}

runDynamicVideoTests();
