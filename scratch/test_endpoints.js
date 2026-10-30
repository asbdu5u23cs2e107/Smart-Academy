// Test HTTP routing, module compilation, and asset loading
import assert from 'assert';

console.log('=== TESTING HTTP ROUTES AND COMPONENT BUNDLING ===\n');

async function testEndpoints() {
  const routes = [
    '/',
    '/certificates',
    '/student-dashboard/certificates',
    '/admin/certificates',
    '/admin/Certificates',
    '/admin/students/certificates'
  ];

  for (const route of routes) {
    try {
      const res = await fetch(`http://localhost:5173${route}`);
      console.log(`[HTTP ${res.status}] http://localhost:5173${route}`);
      assert(res.status === 200, `Expected 200 OK for ${route}, got ${res.status}`);
      const text = await res.text();
      assert(text.includes('<!DOCTYPE html>') || text.includes('id="root"'), `HTML root element missing in ${route}`);
    } catch (err) {
      console.error(`[ERROR] Route ${route} failed:`, err.message);
      process.exit(1);
    }
  }

  // Test that Vite compiles Certificates.jsx without syntax/bundling errors
  try {
    const res = await fetch('http://localhost:5173/src/pages/AdminDashboard/Certificates.jsx');
    console.log(`[HTTP ${res.status}] /src/pages/AdminDashboard/Certificates.jsx`);
    assert(res.status === 200, `Expected 200 OK for Certificates.jsx, got ${res.status}`);
    const code = await res.text();
    assert(code.includes('Certificates'), 'Certificates.jsx does not contain Certificates definition');
  } catch (err) {
    console.error('[ERROR] Failed to compile Certificates.jsx:', err.message);
    process.exit(1);
  }

  // Test that Vite compiles Certificate.jsx without syntax/bundling errors
  try {
    const res = await fetch('http://localhost:5173/src/pages/Certificate.jsx');
    console.log(`[HTTP ${res.status}] /src/pages/Certificate.jsx`);
    assert(res.status === 200, `Expected 200 OK for Certificate.jsx, got ${res.status}`);
    const code = await res.text();
    assert(code.includes('Certificate'), 'Certificate.jsx does not contain Certificate definition');
  } catch (err) {
    console.error('[ERROR] Failed to compile Certificate.jsx:', err.message);
    process.exit(1);
  }

  // Test certificateService.js module bundling
  try {
    const res = await fetch('http://localhost:5173/src/services/certificateService.js');
    console.log(`[HTTP ${res.status}] /src/services/certificateService.js`);
    assert(res.status === 200, `Expected 200 OK for certificateService.js, got ${res.status}`);
    const code = await res.text();
    assert(code.includes('autoGenerateCertificateIfEligible'), 'certificateService.js missing exports');
  } catch (err) {
    console.error('[ERROR] Failed to compile certificateService.js:', err.message);
    process.exit(1);
  }

  console.log('\nAll endpoints and components compile cleanly with 200 OK!');
}

testEndpoints();
