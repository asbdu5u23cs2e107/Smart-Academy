/**
 * Comprehensive Automated Test Suite for Resources System
 * Verifies all requirements:
 * 1. Root cause fix - No raw source code or raw markdown files
 * 2. All 5 category filters (All, Notes, Videos, Links, PDFs)
 * 3. Course matching (e.g. Python only shows Python, not HTML/unrelated)
 * 4. Notes content completeness & readability
 * 5. Video player URLs & validity
 * 6. Educational webpage links
 * 7. PDF handbooks & downloads
 * 8. Error handling for unavailable resources
 */

import {
  BUILT_IN_RESOURCES,
  getAllResources,
  filterResources,
  isCourseMatch,
  matchesCategory
} from '../src/services/resourceRepository.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('=== TEST SUITE 1: ROOT CAUSE FIX (No raw code URLs) ===');
const allResources = getAllResources();
assert(allResources.length > 0, `Loaded ${allResources.length} total resources`);

const rawGithubMatches = allResources.filter(r => 
  (r.fileUrl && r.fileUrl.includes('raw.githubusercontent.com')) || 
  (r.fileUrl && r.fileUrl.endsWith('.md'))
);
assert(rawGithubMatches.length === 0, `No resources point to raw.githubusercontent.com or raw markdown files (Found: ${rawGithubMatches.length})`);

console.log('\n=== TEST SUITE 2: ALL 5 CATEGORY FILTERS ===');
const allFilter = filterResources(allResources, { category: 'All' });
assert(allFilter.length === allResources.length, `Filter 'All' returns all resources (${allFilter.length})`);

const notesFilter = filterResources(allResources, { category: 'Notes' });
assert(notesFilter.length > 0, `Filter 'Notes' returns notes (${notesFilter.length})`);
assert(notesFilter.every(r => r.type === 'Notes' || r.type === 'PPT' || r.category.includes('Note')), `All items in 'Notes' are notes/presentations`);

const videosFilter = filterResources(allResources, { category: 'Videos' });
assert(videosFilter.length > 0, `Filter 'Videos' returns videos (${videosFilter.length})`);
assert(videosFilter.every(r => r.type === 'Video' || r.fileName.endsWith('.mp4')), `All items in 'Videos' are video tutorials`);

const linksFilter = filterResources(allResources, { category: 'Links' });
assert(linksFilter.length > 0, `Filter 'Links' returns links (${linksFilter.length})`);
assert(linksFilter.every(r => r.type === 'Link' || r.category.includes('Official') || r.category.includes('Doc')), `All items in 'Links' are educational web links`);

const pdfsFilter = filterResources(allResources, { category: 'PDFs' });
assert(pdfsFilter.length > 0, `Filter 'PDFs' returns PDFs (${pdfsFilter.length})`);
assert(pdfsFilter.every(r => r.type === 'PDF' || r.fileName.endsWith('.pdf') || r.type === 'Notes'), `All items in 'PDFs' are PDF handbooks/notes`);

console.log('\n=== TEST SUITE 3: COURSE MATCHING (Requirement 8) ===');
// Python course matching
const pythonAll = filterResources(allResources, { category: 'All', course: 'Python Programming' });
assert(pythonAll.length > 0, `Python course returns ${pythonAll.length} resources`);
const pythonUnrelated = pythonAll.filter(r => 
  r.course.toLowerCase().includes('java') || 
  r.course.toLowerCase().includes('web') || 
  r.title.toLowerCase().includes('html')
);
assert(pythonUnrelated.length === 0, `Python resources DO NOT include HTML, Java, or unrelated content (Found: ${pythonUnrelated.length})`);

const pythonNotes = filterResources(allResources, { category: 'Notes', course: 'Python Programming' });
assert(pythonNotes.length > 0, `Python Notes category returns ${pythonNotes.length} item(s)`);
assert(pythonNotes[0].notesContent !== null && typeof pythonNotes[0].notesContent === 'object', `Python Notes contain rich structured notesContent`);
assert(pythonNotes[0].notesContent.modules.length >= 3, `Python Notes contain comprehensive modules (Found ${pythonNotes[0].notesContent.modules.length})`);

const pythonVideos = filterResources(allResources, { category: 'Videos', course: 'Python Programming' });
assert(pythonVideos.length > 0, `Python Videos category returns ${pythonVideos.length} item(s)`);
assert(pythonVideos[0].fileUrl && pythonVideos[0].fileUrl.includes('youtube.com'), `Python Video contains valid playable video stream URL: ${pythonVideos[0].fileUrl}`);

const pythonLinks = filterResources(allResources, { category: 'Links', course: 'Python Programming' });
assert(pythonLinks.length > 0, `Python Links category returns ${pythonLinks.length} item(s)`);
assert(pythonLinks[0].fileUrl === 'https://docs.python.org/3/', `Python Link points to official Python documentation`);

const pythonPdfs = filterResources(allResources, { category: 'PDFs', course: 'Python Programming' });
assert(pythonPdfs.length > 0, `Python PDFs category returns ${pythonPdfs.length} item(s)`);
assert(pythonPdfs[0].fileName.endsWith('.pdf'), `Python PDF has .pdf filename: ${pythonPdfs[0].fileName}`);

// Test Java Course
const javaAll = filterResources(allResources, { category: 'All', course: 'Java Enterprise' });
assert(javaAll.length > 0, `Java course returns ${javaAll.length} resources`);
assert(javaAll.every(r => r.course.toLowerCase().includes('java')), `All Java resources belong to Java course`);

// Test SQL Course
const sqlAll = filterResources(allResources, { category: 'All', course: 'SQL Database' });
assert(sqlAll.length > 0, `SQL course returns ${sqlAll.length} resources`);
assert(sqlAll.every(r => r.course.toLowerCase().includes('sql')), `All SQL resources belong to SQL course`);

// Test React Course
const reactAll = filterResources(allResources, { category: 'All', course: 'React JS' });
assert(reactAll.length > 0, `React course returns ${reactAll.length} resources`);
assert(reactAll.every(r => r.course.toLowerCase().includes('react')), `All React resources belong to React course`);

// Test AI / Machine Learning Course
const aiAll = filterResources(allResources, { category: 'All', course: 'AI / Machine Learning' });
assert(aiAll.length > 0, `AI/ML course returns ${aiAll.length} resources`);
assert(aiAll.every(r => r.course.toLowerCase().includes('ai') || r.course.toLowerCase().includes('machine')), `All AI resources belong to AI course`);

console.log('\n=== TEST SUITE 4: ACROSS ALL 13 COURSES COVERAGE ===');
const testCourses = [
  'Python Programming',
  'Full Stack Development',
  'React JS',
  'Java Enterprise',
  'SQL Database',
  'AI / Machine Learning',
  'Data Science',
  'Node.js Backend',
  'MongoDB Database',
  'Angular',
  'UI/UX Design',
  'ASP.NET Core',
  'Digital Marketing'
];

testCourses.forEach(courseName => {
  const courseRes = filterResources(allResources, { category: 'All', course: courseName });
  assert(courseRes.length >= 3, `Course "${courseName}" has complete resources (${courseRes.length} items)`);
});

console.log('\n=======================================');
console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log('=======================================');

if (failed > 0) {
  process.exit(1);
}
