async function testGCS() {
  for (const b of ['smartacademy-31afb.firebasestorage.app', 'smartacademy-31afb.appspot.com', 'smartacademy-31afb']) {
    const url = `https://storage.googleapis.com/storage/v1/b/${b}`;
    const res = await fetch(url);
    console.log(`GCS bucket ${b}:`, res.status, await res.text());
  }
}
testGCS();
