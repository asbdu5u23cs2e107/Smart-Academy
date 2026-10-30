/**
 * Automated Verification Script for Resources Center Functionality
 *
 * Validates:
 * 1. Unified resource retrieval (no empty "No resources found" on initial load)
 * 2. All 5 category filters (All, Notes, Videos, Links, PDFs)
 * 3. Search query filtering across title, course, trainer, and category
 * 4. Admin-to-student resource addition, retrieval, persistence, and deletion
 * 5. Resilient error handling when Firestore permissions are missing/restricted
 */

import {
  getAllResources,
  addResource,
  deleteResource,
  matchesCategory,
  filterResources,
  fetchRemoteResources,
  normalizeResource,
  BUILT_IN_RESOURCES,
} from '../src/services/resourceRepository.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log('=== RUNNING RESOURCES CENTER FUNCTIONALITY TESTS ===\n');

  // Test 1: Built-in & initial resources availability
  console.log('1. Checking Initial Resources Retrieval:');
  const allResources = getAllResources();
  assert(Array.isArray(allResources), 'getAllResources() returns an array');
  assert(allResources.length >= 10, `Initial resources count is ${allResources.length} (>= 10 expected)`);

  const sampleNote = allResources.find((r) => r.type === 'Notes');
  assert(!!sampleNote, 'Notes resources exist in repository');
  assert(!!sampleNote.title && !!sampleNote.course && !!sampleNote.fileUrl, 'Sample note has title, course, and fileUrl');

  const sampleVideo = allResources.find((r) => r.type === 'Video');
  assert(!!sampleVideo, 'Video resources exist in repository');
  assert(!!sampleVideo.title && !!sampleVideo.fileUrl, 'Sample video has title and fileUrl');

  const sampleLink = allResources.find((r) => r.type === 'Link');
  assert(!!sampleLink, 'Educational Link resources exist in repository');
  assert(sampleLink.fileUrl.startsWith('http'), 'Sample link has valid HTTP/HTTPS URL');

  const samplePPT = allResources.find((r) => r.type === 'PPT');
  assert(!!samplePPT, 'PPT presentation resources exist in repository');

  // Test 2: Category Filter Matching
  console.log('\n2. Checking Category Filter Logic:');

  const allFiltered = filterResources(allResources, { category: 'All' });
  assert(allFiltered.length === allResources.length, `Filter "All" returns all ${allFiltered.length} items`);

  const notesFiltered = filterResources(allResources, { category: 'Notes' });
  assert(notesFiltered.length > 0, `Filter "Notes" returned ${notesFiltered.length} items (not 0!)`);
  assert(
    notesFiltered.every((r) => matchesCategory(r, 'Notes')),
    'Every item in Notes filter passes matchesCategory(r, "Notes")'
  );

  const videosFiltered = filterResources(allResources, { category: 'Videos' });
  assert(videosFiltered.length > 0, `Filter "Videos" returned ${videosFiltered.length} items`);
  assert(
    videosFiltered.every((r) => r.type === 'Video' || r.category.toLowerCase().includes('video')),
    'Every item in Videos filter is an educational video'
  );

  const linksFiltered = filterResources(allResources, { category: 'Links' });
  assert(linksFiltered.length > 0, `Filter "Links" returned ${linksFiltered.length} items`);
  assert(
    linksFiltered.every((r) => r.type === 'Link' || r.fileUrl.startsWith('http')),
    'Every item in Links filter is an external educational link'
  );

  const pdfsFiltered = filterResources(allResources, { category: 'PDFs' });
  assert(pdfsFiltered.length > 0, `Filter "PDFs" returned ${pdfsFiltered.length} items`);
  assert(
    pdfsFiltered.every((r) => r.type === 'PDF' || r.type === 'Notes' || r.fileName.toLowerCase().endsWith('.pdf') || r.fileUrl.includes('.pdf')),
    'Every item in PDFs filter is a valid PDF study resource'
  );

  // Test 3: Search Query Filtering
  console.log('\n3. Checking Search Query Filtering:');
  const pythonSearch = filterResources(allResources, { search: 'python' });
  assert(pythonSearch.length > 0, `Searching "python" returned ${pythonSearch.length} items`);
  assert(
    pythonSearch.every((r) => `${r.title} ${r.course} ${r.description}`.toLowerCase().includes('python')),
    'All search results for "python" match course or title'
  );

  const javaSearch = filterResources(allResources, { search: 'java' });
  assert(javaSearch.length > 0, `Searching "java" returned ${javaSearch.length} items`);

  // Test 4: Admin-to-Student Resource Flow (Add, Retrieve, Persist, Delete)
  console.log('\n4. Checking Admin Resource Creation & Student Display:');
  const testResource = {
    title: 'Admin Uploaded Verification Study Guide',
    course: 'Web Development',
    category: 'Study Notes',
    trainer: 'SwordNex Chief Instructor',
    description: 'Special exam revision notes uploaded by admin for academy students.',
    fileName: 'Exam_Revision_Guide.pdf',
    fileSize: 1540000,
    fileUrl: 'https://example.com/downloads/Exam_Revision_Guide.pdf',
    type: 'Notes',
    status: 'Published',
  };

  const savedResource = await addResource(testResource);
  assert(!!savedResource && !!savedResource.id, `Resource added with ID: ${savedResource?.id}`);

  const updatedResources = getAllResources();
  const foundInStudent = updatedResources.find((r) => r.id === savedResource.id);
  assert(!!foundInStudent, 'Newly saved admin resource immediately appears in student resources list');
  assert(foundInStudent?.title === testResource.title, 'Title preserved accurately');
  assert(foundInStudent?.course === testResource.course, 'Course preserved accurately');
  assert(foundInStudent?.fileUrl === testResource.fileUrl, 'File URL preserved accurately');

  // Verify it appears in Notes and PDFs filters
  const foundInNotes = filterResources(updatedResources, { category: 'Notes' }).find((r) => r.id === savedResource.id);
  assert(!!foundInNotes, 'Admin resource appears when Student clicks "Notes" category');

  const foundInPdfs = filterResources(updatedResources, { category: 'PDFs' }).find((r) => r.id === savedResource.id);
  assert(!!foundInPdfs, 'Admin resource appears when Student clicks "PDFs" category');

  // Clean up
  await deleteResource(savedResource.id);
  const afterDelete = getAllResources().find((r) => r.id === savedResource.id);
  assert(!afterDelete, 'Admin deleted resource is cleanly removed from student view');

  // Test 5: Permission & Fallback Resilience
  console.log('\n5. Checking Fallback Resilience (Permission Error Prevention):');
  let fetchFailedWithCrash = false;
  try {
    const fallbackResources = await fetchRemoteResources();
    assert(Array.isArray(fallbackResources), 'fetchRemoteResources() returns array without crashing');
    assert(fallbackResources.length > 0, 'Fallback resources remain available even under unauthenticated status');
  } catch (err) {
    fetchFailedWithCrash = true;
    console.error('fetchRemoteResources crashed:', err);
  }
  assert(!fetchFailedWithCrash, 'fetchRemoteResources() handles permission error gracefully without throwing');

  console.log(`\n=================================================`);
  console.log(`RESULTS: ${passed} passed, ${failed} failed`);
  console.log(`=================================================`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test run failed:', err);
  process.exit(1);
});
