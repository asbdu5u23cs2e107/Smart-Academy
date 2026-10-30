import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

async function testBucket(bucketName) {
  console.log(`\nTesting bucket: ${bucketName}`);
  const config = {
    apiKey: "AIzaSyCn8wCa1dUJ3Ov-GcCcLUX0xnjd0eCNPbY",
    authDomain: "smartacademy-31afb.firebaseapp.com",
    projectId: "smartacademy-31afb",
    storageBucket: bucketName,
    appId: "1:772171369087:web:fb4a693183475e03214d4a"
  };
  const app = initializeApp(config, `app-${bucketName}`);
  const storage = getStorage(app);
  try {
    const bytes = new Uint8Array([1, 2, 3, 4]);
    const fileRef = ref(storage, `test/${Date.now()}.bin`);
    await uploadBytes(fileRef, bytes);
    const url = await getDownloadURL(fileRef);
    console.log(`✓ Bucket ${bucketName} SUCCESS! URL:`, url);
  } catch (err) {
    console.log(`✗ Bucket ${bucketName} error:`, err.code, err.message);
    if (err.customData?.serverResponse) {
      console.log('Server response:', err.customData.serverResponse);
    }
  }
}

async function run() {
  await testBucket("smartacademy-31afb.firebasestorage.app");
  await testBucket("smartacademy-31afb.appspot.com");
}

run();
