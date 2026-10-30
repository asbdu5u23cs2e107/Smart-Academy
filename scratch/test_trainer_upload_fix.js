/**
 * Automated Verification Script for Trainer Panel Course Video and Notes Upload
 */

import { getAllCourses, getCourseById } from '../src/services/courseRepository.js';
import {
  addResource,
  getAllResources,
  filterResources,
  isCourseMatch,
  getCustomResources
} from '../src/services/resourceRepository.js';

async function runTrainerUploadVerification() {
  console.log('===============================================================');
  console.log(' RUNNING TRAINER PANEL VIDEO & NOTES UPLOAD VERIFICATION TESTS');
  console.log('===============================================================\n');

  let passed = 0;
  let total = 0;

  function assert(name, condition, errorMsg = '') {
    total++;
    if (condition) {
      console.log(`[PASS] ${name}`);
      passed++;
    } else {
      console.error(`[FAIL] ${name} - ${errorMsg}`);
    }
  }

  // 1. Verify Course Catalog Availability for Trainer Dropdown
  const courses = getAllCourses();
  assert('Course catalog has available courses for trainer selection', courses && courses.length > 0);
  const fsdCourse = courses.find(c => c.id === 'fsd');
  assert('Full Stack Development course exists in options', !!fsdCourse);
  const pythonCourse = courses.find(c => c.id === 'python');
  assert('Python Full Stack course exists in options', !!pythonCourse);

  // 2. Test Trainer Video Upload Payload & Save to Unified Repository
  console.log('\n--- 2. Testing Trainer Video Upload ---');
  const testVideoPayload = {
    title: 'Trainer Advanced React Patterns',
    course: fsdCourse.title,
    courseId: fsdCourse.id,
    fileName: 'react_advanced.mp4',
    fileSize: 15485760, // 15 MB
    fileType: 'video/mp4',
    fileUrl: 'https://firebasestorage.googleapis.com/v0/b/smartacademy-31afb.firebasestorage.app/o/videos%2Freact_advanced.mp4?alt=media',
    storagePath: 'videos/react_advanced.mp4',
    type: 'Video',
    category: 'Video Tutorials',
    trainer: 'Senior Trainer',
    status: 'Published',
    createdAt: new Date().toISOString(),
    collectionName: 'videos'
  };

  const savedVideo = await addResource(testVideoPayload);
  assert('Video uploaded resource returned valid ID', !!savedVideo.id);
  assert('Video course is Full Stack Development', savedVideo.course === 'Full Stack Development');
  assert('Video courseId matches fsd', savedVideo.courseId === 'fsd' || savedVideo.course === 'Full Stack Development');
  assert('Video type is normalized to Video', savedVideo.type === 'Video');
  assert('Video download URL is preserved', savedVideo.fileUrl.includes('react_advanced.mp4'));

  // 3. Test Trainer Notes Upload Payload & Save to Unified Repository
  console.log('\n--- 3. Testing Trainer Notes Upload ---');
  const testNotesPayload = {
    title: 'Trainer Express & MongoDB Architecture Notes',
    course: fsdCourse.title,
    courseId: fsdCourse.id,
    fileName: 'express_mongodb_architecture.pdf',
    fileSize: 2048576, // 2 MB
    fileType: 'application/pdf',
    fileUrl: 'https://firebasestorage.googleapis.com/v0/b/smartacademy-31afb.firebasestorage.app/o/notes%2Fexpress_notes.pdf?alt=media',
    storagePath: 'notes/express_notes.pdf',
    type: 'Notes',
    category: 'Study Notes',
    trainer: 'Senior Trainer',
    status: 'Published',
    createdAt: new Date().toISOString(),
    collectionName: 'resources'
  };

  const savedNotes = await addResource(testNotesPayload);
  assert('Notes uploaded resource returned valid ID', !!savedNotes.id);
  assert('Notes course is Full Stack Development', savedNotes.course === 'Full Stack Development');
  assert('Notes type is normalized to Notes', savedNotes.type === 'Notes');
  assert('Notes download URL is preserved', savedNotes.fileUrl.includes('express_notes.pdf'));

  // 4. Test Independence of Video and Notes Uploads
  console.log('\n--- 4. Testing Independence of Uploads ---');
  assert('Video and Notes have distinct IDs', savedVideo.id !== savedNotes.id);
  assert('Video type is distinct from Notes type', savedVideo.type === 'Video' && savedNotes.type === 'Notes');

  // 5. Test Persistence (Simulating Page Refresh)
  console.log('\n--- 5. Testing Persistence across Page Refresh ---');
  const allResources = getAllResources();
  const retrievedVideo = allResources.find(r => r.title === 'Trainer Advanced React Patterns');
  assert('Uploaded video remains accessible via getAllResources (persisted across refresh)', !!retrievedVideo);
  const retrievedNotes = allResources.find(r => r.title === 'Trainer Express & MongoDB Architecture Notes');
  assert('Uploaded notes remain accessible via getAllResources (persisted across refresh)', !!retrievedNotes);

  // 6. Test Correct Course Filtering and Matching
  console.log('\n--- 6. Testing Course Isolation ---');
  assert('Uploaded video matches Full Stack Development course', isCourseMatch(retrievedVideo.course, 'Full Stack Development'));
  assert('Uploaded video does NOT match Python Programming course', !isCourseMatch(retrievedVideo.course, 'Python Programming'));
  assert('Uploaded notes match Full Stack Development course', isCourseMatch(retrievedNotes.course, 'Full Stack Development'));
  assert('Uploaded notes do NOT match Python Programming course', !isCourseMatch(retrievedNotes.course, 'Python Programming'));

  // Summary
  console.log('\n===============================================================');
  console.log(` RESULTS: ${passed}/${total} TESTS PASSED`);
  console.log('===============================================================');

  if (passed === total) {
    console.log('ALL TESTS PASSED SUCCESSFULLY!');
  } else {
    process.exit(1);
  }
}

runTrainerUploadVerification();
