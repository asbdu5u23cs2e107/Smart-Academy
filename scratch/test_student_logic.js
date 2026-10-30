// Verification test script for student login, course selection, and student data isolation
import { 
  getStudentKey, 
  getStudentData, 
  selectStudentCourse, 
  recordVideoWatch, 
  toggleLessonCompletion,
  getAvailableCourses 
} from '../src/services/studentDataService.js';

// Polyfill minimal browser globals for Node test environment
if (typeof window === 'undefined') {
  const store = new Map();
  global.localStorage = {
    getItem: (key) => store.get(key) || null,
    setItem: (key, val) => store.set(key, String(val)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear(),
    dump: () => Object.fromEntries(store.entries())
  };
  global.window = {
    dispatchEvent: () => {},
    addEventListener: () => {},
    removeEventListener: () => {}
  };
}

console.log('========================================================');
console.log('🧪 RUNNING STUDENT LOGIN & COURSE SELECTION FLOW TESTS');
console.log('========================================================\n');

// TEST 1: New Student Login (Alice)
console.log('--- TEST 1: Brand New Student Login (Alice) ---');
const aliceUser = {
  id: 'student_alice_smartacademy_test',
  name: 'Alice',
  email: 'alice@smartacademy.test',
  role: 'student'
};

const initialAliceData = getStudentData(aliceUser);
console.log('1. Alice isNewStudent:', initialAliceData.isNewStudent);
console.log('2. Alice selectedCourseId:', initialAliceData.selectedCourseId);
console.log('3. Alice enrolledCourses count:', initialAliceData.enrolledCourses.length);
console.log('4. Alice watchedVideos count:', initialAliceData.watchedVideos.length);
console.log('5. Alice progress:', initialAliceData.progress + '%');

if (initialAliceData.isNewStudent !== true || initialAliceData.selectedCourseId !== null || initialAliceData.watchedVideos.length !== 0) {
  throw new Error('TEST 1 FAILED: New student should have isNewStudent: true and no pre-selected course/videos!');
}
console.log('✅ TEST 1 PASSED: Brand new student has no old course, 0% progress, and 0 watched videos.\n');

// TEST 2: Course Selection (Alice selects Python Full Stack)
console.log('--- TEST 2: Course Selection (Alice selects Python Full Stack) ---');
const availableCourses = getAvailableCourses();
console.log('Available courses count:', availableCourses.length);
const pythonCourse = availableCourses.find(c => c.id === 'python' || c.id === 'python-fs');
console.log('Found course:', pythonCourse.title);

const aliceAfterCourseSelect = selectStudentCourse(aliceUser, pythonCourse);
console.log('1. Alice isNewStudent after selection:', aliceAfterCourseSelect.isNewStudent);
console.log('2. Alice active course:', aliceAfterCourseSelect.selectedCourse.title);
console.log('3. Alice progress:', aliceAfterCourseSelect.progress + '%');
console.log('4. Alice enrolled courses:', aliceAfterCourseSelect.enrolledCourses.map(c => c.title));

if (aliceAfterCourseSelect.isNewStudent !== false || !aliceAfterCourseSelect.selectedCourse || aliceAfterCourseSelect.progress !== 0) {
  throw new Error('TEST 2 FAILED: Course selection did not update student record properly!');
}
console.log('✅ TEST 2 PASSED: Course selection activates course with 0% initial progress.\n');

// TEST 3: Video Watching & Lesson Completion (Alice)
console.log('--- TEST 3: Video Watching & Lesson Completion (Alice) ---');
recordVideoWatch(aliceUser, 1, 'Python Introduction');
const aliceAfterWatch = getStudentData(aliceUser);
console.log('Alice watched videos:', aliceAfterWatch.watchedVideos);

const aliceAfterComplete = toggleLessonCompletion(aliceUser, 'python', 1, 'Python Introduction');
console.log('Alice completed lessons:', aliceAfterComplete.completedLessons);
console.log('Alice updated progress:', aliceAfterComplete.progress + '%');
console.log('Alice recent activity:', aliceAfterComplete.recentActivity.map(a => a.action));

if (!aliceAfterComplete.completedLessons.includes(1) || aliceAfterComplete.progress <= 0) {
  throw new Error('TEST 3 FAILED: Progress not calculated after lesson completion!');
}
console.log('✅ TEST 3 PASSED: Lesson completion updates progress and recent activity.\n');

// TEST 4: Second Brand-New Student (Bob)
console.log('--- TEST 4: Second Brand New Student Login (Bob) ---');
const bobUser = {
  id: 'student_bob_smartacademy_test',
  name: 'Bob',
  email: 'bob@smartacademy.test',
  role: 'student'
};

const initialBobData = getStudentData(bobUser);
console.log('1. Bob isNewStudent:', initialBobData.isNewStudent);
console.log('2. Bob selectedCourseId:', initialBobData.selectedCourseId);
console.log('3. Bob enrolledCourses count:', initialBobData.enrolledCourses.length);
console.log('4. Bob watchedVideos count:', initialBobData.watchedVideos.length);
console.log('5. Bob progress:', initialBobData.progress + '%');

if (initialBobData.isNewStudent !== true || initialBobData.selectedCourseId !== null || initialBobData.watchedVideos.length !== 0) {
  throw new Error('TEST 4 FAILED: Bob must NOT inherit Alice\'s data!');
}
console.log('✅ TEST 4 PASSED: Bob is isolated, sees Welcome screen and Course Selection without Alice\'s data.\n');

// TEST 5: Bob Selects Java Developer Bootcamp
console.log('--- TEST 5: Bob selects Java Developer Bootcamp ---');
const javaCourse = availableCourses.find(c => c.id === 'java' || c.id === 'java-dev');
console.log('Bob selects:', javaCourse.title);

const bobAfterCourseSelect = selectStudentCourse(bobUser, javaCourse);
console.log('Bob active course:', bobAfterCourseSelect.selectedCourse.title);
console.log('Bob progress:', bobAfterCourseSelect.progress + '%');

if (bobAfterCourseSelect.selectedCourse.id !== 'java' && bobAfterCourseSelect.selectedCourse.id !== 'java-dev') {
  throw new Error('TEST 5 FAILED: Bob did not select Java course!');
}
console.log('✅ TEST 5 PASSED: Bob is now enrolled in Java Developer Bootcamp.\n');

// TEST 6: Returning Student Verification (Alice logs back in)
console.log('--- TEST 6: Returning Student Verification (Alice logs back in) ---');
const aliceReturning = getStudentData(aliceUser);
console.log('1. Alice returning isNewStudent:', aliceReturning.isNewStudent);
console.log('2. Alice returning course:', aliceReturning.selectedCourse.title);
console.log('3. Alice returning progress:', aliceReturning.progress + '%');
console.log('4. Alice completed lessons:', aliceReturning.completedLessons);
console.log('5. Alice watched videos:', aliceReturning.watchedVideos);

if (aliceReturning.isNewStudent !== false || aliceReturning.selectedCourse.title !== 'Python Full Stack' || aliceReturning.progress <= 0) {
  throw new Error('TEST 6 FAILED: Alice returning data was not preserved!');
}
if (aliceReturning.selectedCourse.title === bobAfterCourseSelect.selectedCourse.title) {
  throw new Error('TEST 6 FAILED: Alice and Bob courses collided!');
}
console.log('✅ TEST 6 PASSED: Alice retains her Python course & progress, completely isolated from Bob.\n');

console.log('========================================================');
console.log('🎉 ALL 6 VERIFICATION TESTS PASSED SUCCESSFULLY!');
console.log('========================================================');
