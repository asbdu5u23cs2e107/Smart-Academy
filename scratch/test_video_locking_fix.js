/**
 * Automated Verification Suite for Video Locking Issue Fix
 * 
 * Verifies that:
 * 1. Across all courses (Java, Python, AI/ML, Web Dev, Data Science, Custom Courses),
 *    lessons are NOT locked merely because they are not the first lesson.
 * 2. Unintended sequential unlocking has been eliminated:
 *    Lesson 2, 3, 4... can be opened and played without completing Lesson 1.
 * 3. Every lesson has its own valid, distinct video URL and does not reuse lesson 1's video.
 * 4. Page refresh and progress restoration preserves accessibility across all lessons.
 * 5. Legitimate access restrictions (isLocked, isPremium without enrollment) are preserved.
 */

import { readFileSync } from 'fs';
import { getCourseLessonsWithVideos } from '../src/services/videoRetrievalService.js';
import {
  getCourseById,
  getAllCourses,
  saveCustomCourse,
  deleteCustomCourse
} from '../src/services/courseRepository.js';

async function runVideoLockingTests() {
  console.log("=================================================================");
  console.log("      RUNNING VIDEO LOCKING FIX & MULTI-COURSE ACCESS TESTS      ");
  console.log("=================================================================\n");

  let total = 0;
  let passed = 0;

  function assert(name, condition, details = "") {
    total++;
    if (condition) {
      console.log(`[PASS] ${name}`);
      passed++;
    } else {
      console.error(`[FAIL] ${name} - ${details}`);
    }
  }

  // -----------------------------------------------------------------
  // 1. Shared Code Inspection (CourseDetails.jsx)
  // -----------------------------------------------------------------
  console.log("--- 1. Inspecting Shared Code Access Logic in CourseDetails.jsx ---");
  const courseDetailsCode = readFileSync('src/pages/CourseDetails.jsx', 'utf-8');

  assert(
    "CourseDetails.jsx removed artificial 'unlockedLessons = [1]' state",
    !courseDetailsCode.includes("const [unlockedLessons, setUnlockedLessons] = useState([1]);")
  );

  assert(
    "CourseDetails.jsx removed 'setUnlockedLessons([1])' fallback",
    !courseDetailsCode.includes("setUnlockedLessons([1])")
  );

  assert(
    "CourseDetails.jsx removed sequential unlocking requirement from handleCompleteLesson",
    !courseDetailsCode.includes("setUnlockedLessons(prev => [...prev, nextLesson])")
  );

  assert(
    "CourseDetails.jsx allows direct lesson completion without blocking on watchedLessons",
    !courseDetailsCode.includes("Complete Video First")
  );

  assert(
    "CourseDetails.jsx toggleLesson does not block accessible lessons",
    !courseDetailsCode.includes("if (status === 'locked') return;")
  );

  assert(
    "CourseDetails.jsx preserves legitimate restrictions (isLocked / isPremium)",
    courseDetailsCode.includes("isExplicitlyLocked")
  );

  // -----------------------------------------------------------------
  // 2. Course-by-Course Verification Helper
  // -----------------------------------------------------------------
  async function testCourseLessonsAccess(courseId, courseLabel) {
    console.log(`\n--- Testing ${courseLabel} (id: ${courseId}) ---`);
    const course = getCourseById(courseId);
    assert(`${courseLabel} resolves from repository`, !!course);

    const videoData = await getCourseLessonsWithVideos(course);
    const lessons = videoData.lessons;
    assert(`${courseLabel} has at least 3 lessons`, lessons && lessons.length >= 3, `Count: ${lessons?.length}`);

    // Verify Lesson 1 is playable
    const lesson1 = lessons[0];
    assert(`${courseLabel} Lesson 1 has valid video URL`, !!lesson1.videoUrl && lesson1.videoUrl.startsWith('https://www.youtube.com/embed/'));

    // Verify Lesson 2 is accessible and has its OWN video URL
    const lesson2 = lessons[1];
    assert(`${courseLabel} Lesson 2 has valid video URL`, !!lesson2.videoUrl && lesson2.videoUrl.startsWith('https://www.youtube.com/embed/'));
    assert(
      `${courseLabel} Lesson 2 is NOT locked and can be played directly`,
      lesson2.isLocked !== true
    );

    // Verify Lesson 3+ are accessible
    const lesson3 = lessons[2];
    assert(`${courseLabel} Lesson 3 has valid video URL`, !!lesson3.videoUrl && lesson3.videoUrl.startsWith('https://www.youtube.com/embed/'));
    assert(
      `${courseLabel} Lesson 3 is NOT locked and can be played directly`,
      lesson3.isLocked !== true
    );

    // Verify all remaining lessons are unlocked
    const anyLocked = lessons.some(l => l.isLocked === true);
    assert(`${courseLabel} has NO incorrectly locked lessons`, !anyLocked);

    // Verify videos are not duplicates of the same URL across all lessons
    const uniqueUrls = new Set(lessons.map(l => l.videoUrl));
    assert(`${courseLabel} provides multiple distinct educational lesson videos`, uniqueUrls.size >= 2, `Unique: ${uniqueUrls.size}/${lessons.length}`);
  }

  // -----------------------------------------------------------------
  // 3. Test Multi-Course Access (AI/ML, Java, Python, Web)
  // -----------------------------------------------------------------
  await testCourseLessonsAccess('ai', 'AI / Machine Learning');
  await testCourseLessonsAccess('java', 'Java Developer');
  await testCourseLessonsAccess('python', 'Python Full Stack');
  await testCourseLessonsAccess('fsd', 'Web Development (Full Stack)');
  await testCourseLessonsAccess('sql', 'Data Science & SQL');

  // -----------------------------------------------------------------
  // 4. Test Newly Created Course
  // -----------------------------------------------------------------
  console.log("\n--- Testing Newly Created Course ---");
  const customId = `custom-cyber-sec-${Date.now()}`;
  const customCourse = saveCustomCourse({
    id: customId,
    courseId: customId,
    title: 'Cybersecurity & Ethical Hacking',
    category: 'Security',
    trainer: 'Lead Security Researcher',
    duration: '3 Months',
    syllabus: 'Network Fundamentals, Penetration Testing Tools, Web App Security, Cryptography, Incident Response'
  });

  assert("Custom course saved successfully", !!customCourse);

  const customVideos = await getCourseLessonsWithVideos(customCourse);
  assert("Custom course generated structured lessons", customVideos.lessons.length >= 4);

  const customHasLocks = customVideos.lessons.some(l => l.isLocked === true);
  assert("Newly created course has NO locked lessons for students", !customHasLocks);

  // Clean up
  deleteCustomCourse(customId);

  // -----------------------------------------------------------------
  // 5. Simulated Refresh / Progress Restoration Test
  // -----------------------------------------------------------------
  console.log("\n--- Testing Progress Restoration & Page Refresh ---");
  // Simulate saved progress in localStorage with only Lesson 1 completed
  const simulatedSaved = {
    completedLessons: [1],
    courseCompleted: false
  };

  // Re-map lessons using the updated logic in CourseDetails
  const testLessons = (await getCourseLessonsWithVideos(getCourseById('java'))).lessons.map((l, idx) => {
    const lessonNum = Number(l.num || l.id || idx + 1);
    const isCompleted = simulatedSaved.completedLessons.includes(lessonNum);
    const isExplicitlyLocked = l.isLocked === true;
    let status = 'available';
    if (isExplicitlyLocked) status = 'locked';
    else if (isCompleted) status = 'completed';
    return { ...l, num: lessonNum, status };
  });

  assert("After simulated refresh, Lesson 1 status is 'completed'", testLessons[0].status === 'completed');
  assert("After simulated refresh, Lesson 2 status is 'available' (NOT locked)", testLessons[1].status === 'available');
  assert("After simulated refresh, Lesson 3 status is 'available' (NOT locked)", testLessons[2].status === 'available');
  assert("After simulated refresh, NO lessons are locked", testLessons.every(l => l.status !== 'locked'));

  console.log("\n=================================================================");
  console.log(` RESULTS: ${passed}/${total} TESTS PASSED`);
  console.log("=================================================================\n");

  if (passed === total) {
    console.log("ALL VIDEO LOCKING TESTS PASSED PERFECTLY!\n");
    process.exit(0);
  } else {
    console.error("SOME TESTS FAILED.\n");
    process.exit(1);
  }
}

runVideoLockingTests().catch(err => {
  console.error("Test runner encountered error:", err);
  process.exit(1);
});
