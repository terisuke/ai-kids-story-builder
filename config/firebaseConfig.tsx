// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-kids-story-builder-9ca4e.firebaseapp.com",
  projectId: "ai-kids-story-builder-9ca4e",
  storageBucket: "ai-kids-story-builder-9ca4e.firebasestorage.app",
  messagingSenderId: "554626305408",
  appId: "1:554626305408:web:e58ef87c536639e2e68565"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);