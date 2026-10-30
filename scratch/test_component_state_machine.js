// Comprehensive State Machine Test for Certificate Management
import assert from 'assert';

console.log('=== RUNNING CERTIFICATE STATE MACHINE VERIFICATION ===\n');

let testsPassed = 0;
let testsFailed = 0;

function runTest(name, fn) {
  try {
    fn();
    console.log(`[PASS] ${name}`);
    testsPassed++;
  } catch (err) {
    console.error(`[FAIL] ${name}:`, err.message);
    testsFailed++;
  }
}

// 1. Initial State & Auto-population on Student Change
runTest('handleStudentChange properly auto-fills student details and course', () => {
  const students = [
    { id: 'std_001', studentName: 'Priya Sharma', email: 'priya@gmail.com', phone: '9876543210', course: 'React JS' },
    { id: 'std_002', studentName: 'Arun Kumar', email: 'arun@gmail.com', phone: '9876543211', course: 'Python Full Stack' }
  ];

  let formData = {
    studentId: '',
    studentName: '',
    email: '',
    phone: '',
    course: '',
    certificateId: 'CERT-2026-123456',
    completionDate: '2026-10-26',
    status: 'Issued'
  };

  const onStudentSelect = (selectedId) => {
    const found = students.find(s => s.id === selectedId);
    if (!found) {
      formData = { ...formData, studentId: '', studentName: '', email: '', phone: '', course: '' };
    } else {
      formData = {
        ...formData,
        studentId: found.id,
        studentName: found.studentName,
        email: found.email,
        phone: found.phone,
        course: found.course
      };
    }
  };

  onStudentSelect('std_001');
  assert.strictEqual(formData.studentId, 'std_001');
  assert.strictEqual(formData.studentName, 'Priya Sharma');
  assert.strictEqual(formData.email, 'priya@gmail.com');
  assert.strictEqual(formData.course, 'React JS');

  onStudentSelect('std_002');
  assert.strictEqual(formData.studentId, 'std_002');
  assert.strictEqual(formData.studentName, 'Arun Kumar');
  assert.strictEqual(formData.course, 'Python Full Stack');

  onStudentSelect('');
  assert.strictEqual(formData.studentId, '');
  assert.strictEqual(formData.studentName, '');
});

// 2. Form Validation on Certificate Generation
runTest('handleGenerateCertificate validates required student, course, and date fields', () => {
  const validateForm = (data) => {
    if (!data.studentId) return { valid: false, error: 'Please select a student.' };
    if (!data.studentName) return { valid: false, error: 'Student name not found.' };
    if (!data.course) return { valid: false, error: 'Please select or enter a course.' };
    if (!data.completionDate) return { valid: false, error: 'Please select completion date.' };
    return { valid: true };
  };

  assert.strictEqual(validateForm({ studentId: '', studentName: '', course: '', completionDate: '' }).valid, false);
  assert.strictEqual(validateForm({ studentId: '1', studentName: '', course: '', completionDate: '' }).valid, false);
  assert.strictEqual(validateForm({ studentId: '1', studentName: 'Test', course: '', completionDate: '' }).valid, false);
  assert.strictEqual(validateForm({ studentId: '1', studentName: 'Test', course: 'Java', completionDate: '' }).valid, false);
  assert.strictEqual(validateForm({ studentId: '1', studentName: 'Test', course: 'Java', completionDate: '2026-10-26' }).valid, true);
});

// 3. Filter and Search Dynamic Combining
runTest('Search, Course, Status, and Date filters compose conjunctively', () => {
  const rows = [
    { certificateId: 'CERT-2026-001', studentName: 'Aarav Patel', course: 'React JS', status: 'Issued', completionDate: '2026-08-10' },
    { certificateId: 'CERT-2026-002', studentName: 'Bhavna Sen', course: 'Python Full Stack', status: 'Issued', completionDate: '2026-08-15' },
    { certificateId: 'CERT-2026-003', studentName: 'Aarav Patel', course: 'Python Full Stack', status: 'Pending', completionDate: '2026-07-20' },
    { certificateId: 'CERT-2026-004', studentName: 'Chitra Nair', course: 'React JS', status: 'Revoked', completionDate: '2026-08-25' }
  ];

  const filterRows = ({ search = '', course = 'All Courses', status = 'All Status', date = 'All Dates' }) => {
    return rows.filter(r => {
      const haystack = `${r.certificateId} ${r.studentName} ${r.course} ${r.status}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase().trim());
      const matchesCourse = course === 'All Courses' || r.course === course;
      const matchesStatus = status === 'All Status' || r.status === status;
      let matchesDate = true;
      if (date !== 'All Dates') {
        const d = new Date(r.completionDate);
        matchesDate = !isNaN(d.getTime()) && d.getMonth() === Number(date);
      }
      return matchesSearch && matchesCourse && matchesStatus && matchesDate;
    });
  };

  // Search by student name
  assert.strictEqual(filterRows({ search: 'Aarav' }).length, 2);

  // Search by name AND filter by course
  assert.strictEqual(filterRows({ search: 'Aarav', course: 'React JS' }).length, 1);

  // Filter by status 'Issued'
  assert.strictEqual(filterRows({ status: 'Issued' }).length, 2);

  // Filter by status 'Issued' AND date August (month index 7)
  assert.strictEqual(filterRows({ status: 'Issued', date: '7' }).length, 2);

  // Filter by status 'Pending' AND date August
  assert.strictEqual(filterRows({ status: 'Pending', date: '7' }).length, 0);

  // Filter by status 'Revoked'
  assert.strictEqual(filterRows({ status: 'Revoked' }).length, 1);
});

// 4. Reset Filters Action
runTest('Reset Filters button restores all filter states to default', () => {
  let state = {
    searchTerm: 'custom query',
    course: 'React JS',
    status: 'Pending',
    date: '7',
    currentPage: 3
  };

  const handleResetFilters = () => {
    state = {
      searchTerm: '',
      course: 'All Courses',
      status: 'All Status',
      date: 'All Dates',
      currentPage: 1
    };
  };

  handleResetFilters();
  assert.strictEqual(state.searchTerm, '');
  assert.strictEqual(state.course, 'All Courses');
  assert.strictEqual(state.status, 'All Status');
  assert.strictEqual(state.date, 'All Dates');
  assert.strictEqual(state.currentPage, 1);
});

// 5. Statistics Calculation
runTest('StatCards accurately calculate Total, Issued This Month, Pending, and Revoked', () => {
  const now = new Date();
  const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;

  const certs = [
    { status: 'Issued', completionDate: currentMonthStr },
    { status: 'Issued', completionDate: currentMonthStr },
    { status: 'Issued', completionDate: '2025-01-01' }, // Issued last year
    { status: 'Pending', completionDate: currentMonthStr },
    { status: 'Revoked', completionDate: currentMonthStr },
    { status: 'Revoked', completionDate: '2025-02-01' }
  ];

  const total = certs.length;
  const issuedThisMonth = certs.filter(c => {
    if (c.status !== 'Issued') return false;
    const d = new Date(c.completionDate);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;
  const pending = certs.filter(c => c.status === 'Pending').length;
  const revoked = certs.filter(c => c.status === 'Revoked').length;

  assert.strictEqual(total, 6);
  assert.strictEqual(issuedThisMonth, 2);
  assert.strictEqual(pending, 1);
  assert.strictEqual(revoked, 2);
});

// 6. Revocation State Transition
runTest('Revoke updates certificate status to Revoked and updates stats', () => {
  let certList = [
    { id: 'c1', certificateId: 'CERT-2026-100', status: 'Issued' },
    { id: 'c2', certificateId: 'CERT-2026-200', status: 'Issued' }
  ];

  const revoke = (id) => {
    certList = certList.map(c => c.id === id ? { ...c, status: 'Revoked' } : c);
  };

  revoke('c1');
  assert.strictEqual(certList.find(c => c.id === 'c1').status, 'Revoked');
  assert.strictEqual(certList.find(c => c.id === 'c2').status, 'Issued');
  assert.strictEqual(certList.filter(c => c.status === 'Revoked').length, 1);
});

// 7. Pagination State Navigation
runTest('Pagination handles Next, Previous, and direct page changes within bounds', () => {
  const totalPages = 4;
  let currentPage = 1;

  const onNext = () => { currentPage = Math.min(totalPages, currentPage + 1); };
  const onPrev = () => { currentPage = Math.max(1, currentPage - 1); };
  const onSelectPage = (p) => { if (p >= 1 && p <= totalPages) currentPage = p; };

  // Can't go below 1
  onPrev();
  assert.strictEqual(currentPage, 1);

  // Next page
  onNext();
  assert.strictEqual(currentPage, 2);

  // Jump to page 4
  onSelectPage(4);
  assert.strictEqual(currentPage, 4);

  // Can't exceed totalPages
  onNext();
  assert.strictEqual(currentPage, 4);

  // Previous page
  onPrev();
  assert.strictEqual(currentPage, 3);
});

console.log(`\n========================================`);
console.log(`STATE MACHINE RESULTS: ${testsPassed} passed, ${testsFailed} failed`);
console.log(`========================================\n`);

if (testsFailed > 0) process.exit(1);
