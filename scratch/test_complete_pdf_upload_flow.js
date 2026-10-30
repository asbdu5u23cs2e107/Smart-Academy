/**
 * Comprehensive Verification of PDF Notes Upload Flow, Course Matching, and Resource Center
 */
import { getAllCourses } from '../src/services/courseRepository.js';
import { 
  addResource, 
  getAllResources, 
  filterResources, 
  isCourseMatch, 
  matchesCategory 
} from '../src/services/resourceRepository.js';

async function runTests() {
  console.log('================================================================');
  console.log(' VERIFYING PDF NOTES UPLOAD, REPOSITORY PERSISTENCE & RESOURCES');
  console.log('================================================================\n');

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

  // 1. Verify Artificial Intelligence & Machine Learning Course is in Course Catalog
  const courses = getAllCourses();
  assert('Course catalog has courses', courses && courses.length > 0);
  const aiCourse = courses.find(c => c.id === 'ai' || c.title.toLowerCase().includes('artificial intelligence'));
  assert('Artificial Intelligence & Machine Learning course exists', !!aiCourse);
  console.log(`   Found course: "${aiCourse?.title}" (id: ${aiCourse?.id})`);

  // 2. Validate PDF upload payload structure
  const dummyPdfBase64 = 'data:application/pdf;base64,JVBERi0xLjQKJcTl8uXrp/Og...';
  const testPayload = {
    title: 'Machine Learning Neural Networks Primer',
    course: aiCourse.title,
    courseId: aiCourse.id,
    fileName: 'neural_networks_primer.pdf',
    fileSize: 1048576, // 1 MB
    fileType: 'application/pdf',
    fileUrl: dummyPdfBase64,
    fileURL: dummyPdfBase64,
    storagePath: 'notes/test-ai-primer.pdf',
    type: 'Notes',
    category: 'Study Notes',
    trainer: 'Senior AI Mentor',
    status: 'Published',
    createdAt: new Date().toISOString(),
    views: 0,
    downloads: 0,
    collectionName: 'resources'
  };

  const saved = await addResource(testPayload);

  // 3. Verify Saved Resource fields
  assert('Uploaded note returned valid ID', !!saved.id);
  assert('Title is preserved', saved.title === 'Machine Learning Neural Networks Primer');
  assert('Course matches Artificial Intelligence & Machine Learning', saved.course === aiCourse.title);
  assert('Course ID matches ai', saved.courseId === 'ai');
  assert('Filename is preserved', saved.fileName === 'neural_networks_primer.pdf');
  assert('File URL is preserved', saved.fileUrl === dummyPdfBase64);
  assert('File size is preserved', saved.fileSize === 1048576);
  assert('Type is normalized to Notes', saved.type === 'Notes');
  assert('Category is Study Notes', saved.category === 'Study Notes');
  assert('Timestamp is ISO string', !isNaN(Date.parse(saved.createdAt)));

  // 4. Verify Retrieval in getAllResources()
  const all = getAllResources();
  const retrieved = all.find(r => r.id === saved.id || r.title === 'Machine Learning Neural Networks Primer');
  assert('Uploaded PDF note is retrieved from getAllResources()', !!retrieved);
  assert('Retrieved PDF note retains fileUrl for opening & downloading', retrieved?.fileUrl === dummyPdfBase64);

  // 5. Verify Filter matching in Resources page
  // A) Category matching
  assert("Matches 'All' category", matchesCategory(retrieved, 'All'));
  assert("Matches 'Notes' category", matchesCategory(retrieved, 'Notes'));
  assert("Matches 'PDFs' category", matchesCategory(retrieved, 'PDFs'));
  assert("Does NOT match 'Videos' category", !matchesCategory(retrieved, 'Videos'));

  // B) Course matching
  assert("Matches 'All Courses'", isCourseMatch(retrieved.course, 'All Courses'));
  assert("Matches 'AI / Machine Learning' canonical title", isCourseMatch(retrieved.course, 'AI / Machine Learning'));
  assert("Matches 'Artificial Intelligence & Machine Learning' exact title", isCourseMatch(retrieved.course, 'Artificial Intelligence & Machine Learning'));
  assert("Matches 'ai' course ID", isCourseMatch(retrieved.course, 'ai'));
  assert("Does NOT match 'Python Programming'", !isCourseMatch(retrieved.course, 'Python Programming'));
  assert("Does NOT match 'Full Stack Development'", !isCourseMatch(retrieved.course, 'Full Stack Development'));
  assert("Does NOT match 'Java Enterprise'", !isCourseMatch(retrieved.course, 'Java Enterprise'));

  // C) Full filterResources check
  const filteredForAi = filterResources(all, { category: 'All', search: '', course: 'AI / Machine Learning' });
  const foundInAi = filteredForAi.find(r => r.id === saved.id);
  assert('Uploaded note appears in Resources section when AI course is selected', !!foundInAi);

  const filteredForNotes = filterResources(all, { category: 'Notes', search: '', course: 'AI / Machine Learning' });
  assert("Uploaded note appears in 'Notes' tab for AI course", filteredForNotes.some(r => r.id === saved.id));

  const filteredForPdfs = filterResources(all, { category: 'PDFs', search: '', course: 'AI / Machine Learning' });
  assert("Uploaded note appears in 'PDFs' tab for AI course", filteredForPdfs.some(r => r.id === saved.id));

  const filteredForPython = filterResources(all, { category: 'All', search: '', course: 'Python Programming' });
  assert("Uploaded note does NOT appear under Python course", !filteredForPython.some(r => r.id === saved.id));

  // 6. Test Search in Resources
  const searchResult = filterResources(all, { category: 'All', search: 'Neural Networks', course: 'All Courses' });
  assert("Search for 'Neural Networks' finds uploaded note", searchResult.some(r => r.id === saved.id));

  // Summary
  console.log('\n================================================================');
  console.log(` RESULTS: ${passed}/${total} TESTS PASSED`);
  console.log('================================================================');

  if (passed === total) {
    console.log('✓ ALL TESTS PASSED SUCCESSFULLY!');
  } else {
    process.exit(1);
  }
}

runTests();
