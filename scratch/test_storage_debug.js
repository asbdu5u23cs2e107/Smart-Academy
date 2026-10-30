import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCn8wCa1dUJ3Ov-GcCcLUX0xnjd0eCNPbY",
  authDomain: "smartacademy-31afb.firebaseapp.com",
  projectId: "smartacademy-31afb",
  storageBucket: "smartacademy-31afb.firebasestorage.app",
  messagingSenderId: "772171369087",
  appId: "1:772171369087:web:fb4a693183475e03214d4a"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

async function testUpload() {
  try {
    const fileRef = ref(storage, `notes/test-${Date.now()}.pdf`);
    const blob = new Uint8Array([0x25, 0x50, 0x44, 0x46]); // %PDF
    console.log("Starting uploadBytes...");
    await uploadBytes(fileRef, blob, { contentType: 'application/pdf' });
    console.log("uploadBytes succeeded!");
    const url = await getDownloadURL(fileRef);
    console.log("Download URL:", url);
  } catch (err) {
    console.error("Upload error details:");
    console.error("Code:", err.code);
    console.error("Message:", err.message);
    console.error("Name:", err.name);
    console.error("CustomData:", JSON.stringify(err.customData, null, 2));
    if (err.serverResponse) {
      console.error("ServerResponse:", err.serverResponse);
    }
  }
}

testUpload();
