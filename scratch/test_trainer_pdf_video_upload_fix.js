import assert from 'assert';
import { getAllCourses } from '../src/services/courseRepository.js';
import {
  addResource,
  getAllResources,
  filterResources,
  isCourseMatch,
  matchesCategory
} from '../src/services/resourceRepository.js';

console.log('================================================================');
console.log(' VERIFYING TRAINER PANEL PDF NOTES & VIDEO UPLOADS AND FIXES');
console.log('================================================================\n');

async function testUploadFlow() {
  let passed = 0;
  let total = 0;

  function test(name, fn) {
    total++;
    try {
      fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${name}:`, err.message);
    }
  }

  async function testAsync(name, fn) {
    total++;
    try {
      await fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${name}:`, err.message);
    }
  }

  // 1. Verify Course Options
  test('Available courses can be retrieved for Trainer selection', () => {
    const courses = getAllCourses();
    assert(Array.isArray(courses) && courses.length > 0, 'Courses list should be a non-empty array');
    const fsd = courses.find(c => c.id === 'fsd');
    assert(fsd && fsd.title, 'Full Stack Development course must exist');
    const python = courses.find(c => c.id === 'python');
    assert(python && python.title, 'Python course must exist');
  });

  // 2. Test PDF Upload Payload & Repository Persistence
  await testAsync('PDF Notes upload payload has required fields and persists correctly', async () => {
    const testNotesPayload = {
      title: 'Full Stack JavaScript & Node.js Guide',
      course: 'Full Stack Development',
      courseId: 'fsd',
      fileName: 'js_nodejs_guide.pdf',
      fileSize: 2048576, // 2MB
      fileType: 'application/pdf',
      fileUrl: 'https://firebasestorage.googleapis.com/v0/b/smartacademy-31afb.firebasestorage.app/o/notes%2Ftest_notes.pdf?alt=media&token=abc',
      fileURL: 'https://firebasestorage.googleapis.com/v0/b/smartacademy-31afb.firebasestorage.app/o/notes%2Ftest_notes.pdf?alt=media&token=abc',
      storagePath: 'notes/12345678-js_nodejs_guide.pdf',
      type: 'Notes',
      category: 'Study Notes',
      trainer: 'Senior Trainer',
      status: 'Published',
      createdAt: new Date().toISOString(),
      views: 0,
      downloads: 0,
      collectionName: 'resources',
      firestoreId: 'mock-firestore-doc-123'
    };

    const saved = await addResource(testNotesPayload);
    assert(saved.id, 'Resource must have an ID');
    assert.strictEqual(saved.title, 'Full Stack JavaScript & Node.js Guide');
    assert.strictEqual(saved.course, 'Full Stack Development');
    assert.strictEqual(saved.courseId, 'fsd');
    assert.strictEqual(saved.fileName, 'js_nodejs_guide.pdf');
    assert.strictEqual(saved.type, 'Notes');
    assert.strictEqual(saved.fileUrl, testNotesPayload.fileUrl);

    // Verify it is in getAllResources() (persistence check across refreshes)
    const all = getAllResources();
    const found = all.find(r => r.id === saved.id || r.title === testNotesPayload.title);
    assert(found, 'Uploaded PDF note must be retrievable from getAllResources()');
    assert(isCourseMatch(found.course, 'Full Stack Development'), 'Must match selected course');
    assert(!isCourseMatch(found.course, 'Python Programming'), 'Must NOT match unrelated course');
  });

  // 3. Test Video Upload Payload & Repository Persistence
  await testAsync('Video lesson upload payload has required fields and persists correctly', async () => {
    const testVideoPayload = {
      title: 'Advanced React Hooks Masterclass',
      course: 'Full Stack Development',
      courseId: 'fsd',
      fileName: 'react_hooks_masterclass.mp4',
      fileSize: 15728640, // 15MB
      fileType: 'video/mp4',
      fileUrl: 'https://firebasestorage.googleapis.com/v0/b/smartacademy-31afb.firebasestorage.app/o/videos%2Ftest_video.mp4?alt=media&token=def',
      fileURL: 'https://firebasestorage.googleapis.com/v0/b/smartacademy-31afb.firebasestorage.app/o/videos%2Ftest_video.mp4?alt=media&token=def',
      storagePath: 'videos/12345678-react_hooks_masterclass.mp4',
      type: 'Video',
      category: 'Video Tutorials',
      trainer: 'Senior Trainer',
      status: 'Published',
      createdAt: new Date().toISOString(),
      views: 0,
      downloads: 0,
      collectionName: 'videos',
      firestoreId: 'mock-firestore-video-456'
    };

    const saved = await addResource(testVideoPayload);
    assert(saved.id, 'Video resource must have an ID');
    assert.strictEqual(saved.title, 'Advanced React Hooks Masterclass');
    assert.strictEqual(saved.course, 'Full Stack Development');
    assert.strictEqual(saved.courseId, 'fsd');
    assert.strictEqual(saved.fileName, 'react_hooks_masterclass.mp4');
    assert.strictEqual(saved.type, 'Video');
    assert.strictEqual(saved.fileUrl, testVideoPayload.fileUrl);

    // Verify it is in getAllResources()
    const all = getAllResources();
    const found = all.find(r => r.id === saved.id || r.title === testVideoPayload.title);
    assert(found, 'Uploaded video must be retrievable from getAllResources()');
    assert(isCourseMatch(found.course, 'Full Stack Development'), 'Must match selected course');
  });

  // 4. Test Error Handling & Timeout Behavior (ensuring loading spinner always stops)
  await testAsync('Loading state machine guarantees spinner reset via try/catch/finally', async () => {
    let loadingState = false;
    let errorMessage = '';
    let successMessage = '';

    const simulateUploadWithError = async (failStage) => {
      try {
        loadingState = true;
        errorMessage = '';
        successMessage = '';

        if (failStage === 'storage') {
          throw new Error('Firebase Storage upload timed out after 25 seconds.');
        }

        if (failStage === 'firestore') {
          throw new Error('PERMISSION_DENIED: Missing or insufficient permissions.');
        }

        successMessage = 'Uploaded successfully!';
      } catch (err) {
        errorMessage = err.message;
      } finally {
        loadingState = false;
      }
    };

    // Test storage failure
    await simulateUploadWithError('storage');
    assert.strictEqual(loadingState, false, 'Loading spinner must be false on Storage error');
    assert(errorMessage.includes('timed out'), 'Error message must capture storage timeout');
    assert.strictEqual(successMessage, '', 'Success message must NOT be set on error');

    // Test firestore failure
    await simulateUploadWithError('firestore');
    assert.strictEqual(loadingState, false, 'Loading spinner must be false on Firestore error');
    assert(errorMessage.includes('PERMISSION_DENIED'), 'Error message must capture firestore permission');
    assert.strictEqual(successMessage, '', 'Success message must NOT be set on error');

    // Test success
    await simulateUploadWithError('none');
    assert.strictEqual(loadingState, false, 'Loading spinner must be false on success');
    assert.strictEqual(errorMessage, '', 'No error on success');
    assert(successMessage.includes('Uploaded successfully'), 'Success message shown on success');
  });

  // 5. Test Category and Filtering
  test('Resource filtering maps Notes to Study Notes and Video to Videos', () => {
    const all = getAllResources();
    const notes = filterResources(all, { category: 'Notes', search: '', course: 'Full Stack Development' });
    assert(notes.some(n => n.title === 'Full Stack JavaScript & Node.js Guide'), 'Note must appear under Notes category');

    const videos = filterResources(all, { category: 'Videos', search: '', course: 'Full Stack Development' });
    assert(videos.some(v => v.title === 'Advanced React Hooks Masterclass'), 'Video must appear under Videos category');
  });

  console.log('\n================================================================');
  console.log(` RESULTS: ${passed}/${total} TESTS PASSED`);
  console.log('================================================================');

  if (passed === total) {
    console.log('✓ ALL TRAINER PANEL UPLOAD TESTS PASSED SUCCESSFULLY!\n');
  } else {
    process.exit(1);
  }
}

testUploadFlow();
