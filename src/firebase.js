// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn8wCa1dUJ3Ov-GcCcLUX0xnjd0eCNPbY",
  authDomain: "smartacademy-31afb.firebaseapp.com",
  projectId: "smartacademy-31afb",
  storageBucket: "smartacademy-31afb.firebasestorage.app",
  messagingSenderId: "772171369087",
  appId: "1:772171369087:web:fb4a693183475e03214d4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configure maximum retry timeouts to prevent indefinite hanging (default is 10 minutes)
storage.maxUploadRetryTime = 15000;
storage.maxOperationRetryTime = 15000;

console.log("FireBase connec success");