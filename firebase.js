import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB8q0-dKDSY9oxhEfnb4Nij30VZSFfNa34",
  authDomain: "monikagautam-cfbc4.firebaseapp.com",
  projectId: "monikagautam-cfbc4",
  storageBucket: "monikagautam-cfbc4.appspot.com",
  messagingSenderId: "225196060820",
  appId: "1:225196060820:web:7d4002d2a4bcdf46c20481",
  measurementId: "G-4KYML15KJK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

document.getElementById("signInBtn").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(result => {
      alert(`Welcome ${result.user.displayName}`);
    })
    .catch(error => {
      console.error(error);
    });
});
