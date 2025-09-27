// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3Nibwr1VJLF-1wALwGLkP3RtQiF647Xk",
  authDomain: "financely-april.firebaseapp.com",
  projectId: "financely-april",
  storageBucket: "financely-april.firebasestorage.app",
  messagingSenderId: "87171584353",
  appId: "1:87171584353:web:d94cefcb218c222507b520",
  measurementId: "G-BPRMWC0NKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };