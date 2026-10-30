async function checkStorageEndpoint() {
  const url1 = "https://firebasestorage.googleapis.com/v0/b/smartacademy-31afb.firebasestorage.app/o";
  const url2 = "https://firebasestorage.googleapis.com/v0/b/smartacademy-31afb.appspot.com/o";

  for (const url of [url1, url2]) {
    try {
      console.log(`\nGET ${url}`);
      const res = await fetch(url);
      console.log(`Status: ${res.status} ${res.statusText}`);
      const body = await res.text();
      console.log(`Body: ${body}`);
    } catch (e) {
      console.error("Fetch error:", e.message);
    }
  }

  // Also test firestore REST endpoint
  const fsUrl = "https://firestore.googleapis.com/v1/projects/smartacademy-31afb/databases/(default)/documents/videos?key=AIzaSyCn8wCa1dUJ3Ov-GcCcLUX0xnjd0eCNPbY";
  try {
    console.log(`\nGET Firestore: ${fsUrl}`);
    const res = await fetch(fsUrl);
    console.log(`Status: ${res.status} ${res.statusText}`);
    const body = await res.text();
    console.log(`Body: ${body}`);
  } catch (e) {
    console.error("Firestore fetch error:", e.message);
  }
}

checkStorageEndpoint();
