import { initializeApp } from "firebase/app";
import {getAuth, connectAuthEmulator } from "firebase/auth";
import {getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import {getFunctions, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDvLalTQOYlgAhdfPX-Bj-qakD6QyKKaYo",
  authDomain: "kanplan-804c8.firebaseapp.com",
  projectId: "kanplan-804c8",
  storageBucket: "kanplan-804c8.appspot.com",
  messagingSenderId: "277293535001",
  appId: "1:277293535001:web:ee7530598567cf3500bf88"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const fbFunctions = getFunctions(app);

if (process.env.NODE_ENV === "development") {
    connectAuthEmulator(auth, "http://localhost:9099");
    connectFirestoreEmulator(db, "localhost", 8080);
    connectFunctionsEmulator(fbFunctions, "localhost", 5001);
  }
