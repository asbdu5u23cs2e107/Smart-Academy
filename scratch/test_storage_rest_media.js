async function testRest() {
  for (const bucket of ['smartacademy-31afb.firebasestorage.app', 'smartacademy-31afb.appspot.com']) {
    console.log(`\nTesting REST for bucket: ${bucket}`);
    const url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o?uploadType=media&name=notes%2Ftest.txt`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: 'Hello world'
      });
      console.log(`Status: ${res.status} ${res.statusText}`);
      const text = await res.text();
      console.log(`Body:`, text);
    } catch (err) {
      console.error(`Fetch error:`, err);
    }
  }
}

testRest();
