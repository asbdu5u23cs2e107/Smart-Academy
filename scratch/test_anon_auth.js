import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCn8wCa1dUJ3Ov-GcCcLUX0xnjd0eCNPbY",
  authDomain: "smartacademy-31afb.firebaseapp.com",
  projectId: "smartacademy-31afb",
  storageBucket: "smartacademy-31afb.firebasestorage.app",
  messagingSenderId: "772171369087",
  appId: "1:772171369087:web:fb4a693183475e03214d4a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

signInAnonymously(auth)
  .then((userCred) => {
    console.log("✓ Anonymous Auth SUCCESS! User:", userCred.user.uid);
  })
  .catch((err) => {
    console.log("✗ Anonymous Auth error:", err.code, err.message);
  });
