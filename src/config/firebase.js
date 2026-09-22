import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcG7dnXsR-WuEXwo3TmuCwqmNVCKsMwYc",
  authDomain: "course-website-79c67.firebaseapp.com",
  projectId: "course-website-79c67",
  storageBucket: "course-website-79c67.firebasestorage.app",
  messagingSenderId: "725029307798",
  appId: "1:725029307798:web:4ba3e0c1f7435d590689b7",
  measurementId: "G-XBG24D3KEZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => {
    console.warn("Firebase Analytics not supported in this environment:", err);
  });
}
