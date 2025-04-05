// Firebase SDK v9 Modular Version

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your Firebase config (already provided by you)
const firebaseConfig = {
  apiKey: "AIzaSyDyJaSGUyH4kGUS9RHKF66Vnv0p95G4Mi4",
  authDomain: "monikaflix.firebaseapp.com",
  projectId: "monikaflix",
  storageBucket: "monikaflix.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:your_app_id_here"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase utilities
export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
};
