import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCn8wCa1dUJ3Ov-GcCcLUX0xnjd0eCNPbY",
  authDomain: "smartacademy-31afb.firebaseapp.com",
  projectId: "smartacademy-31afb",
  storageBucket: "smartacademy-31afb.firebasestorage.app",
  messagingSenderId: "772171369087",
  appId: "1:772171369087:web:fb4a693183475e03214d4a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

async function testFirebase() {
  console.log("=== Testing Firestore Write ===");
  try {
    const testDoc = await addDoc(collection(db, "videos"), {
      title: "Test Video",
      course: "Full Stack Development",
      courseId: "fsd",
      fileName: "test.mp4",
      fileUrl: "https://example.com/test.mp4",
      createdAt: new Date().toISOString(),
      trainer: "Test Trainer",
      type: "Video"
    });
    console.log("✓ Firestore write SUCCESS, id:", testDoc.id);

    // Clean up
    await deleteDoc(doc(db, "videos", testDoc.id));
    console.log("✓ Firestore delete SUCCESS");
  } catch (err) {
    console.error("✗ Firestore write error:", err.code, err.message);
  }

  console.log("\n=== Testing Storage Upload ===");
  try {
    const dummyBuffer = Buffer.from("Hello test file content for storage test", "utf-8");
    const testRef = ref(storage, `test/${Date.now()}-test.txt`);
    await uploadBytes(testRef, dummyBuffer, { contentType: 'text/plain' });
    console.log("✓ Storage uploadBytes SUCCESS");
    const url = await getDownloadURL(testRef);
    console.log("✓ Storage getDownloadURL SUCCESS:", url);
    await deleteObject(testRef);
    console.log("✓ Storage deleteObject SUCCESS");
  } catch (err) {
    console.error("✗ Storage upload error:", err.code, err.message);
  }
}

testFirebase();
