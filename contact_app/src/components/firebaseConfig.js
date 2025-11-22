// src/components/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEVaUuazdkD2FfHVHROKcMcbdUyqVm-Ko",
  authDomain: "contact-app-94c8a.firebaseapp.com",
  projectId: "contact-app-94c8a",
  storageBucket: "contact-app-94c8a.firebasestorage.app",
  messagingSenderId: "1026701911994",
  appId: "1:1026701911994:web:494ed79cbf49bf1b1f1f83",
  measurementId: "G-G70G5B7WJN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
