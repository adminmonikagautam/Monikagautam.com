// auth.js
import { auth } from './firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Signup
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        alert('Signed up successfully');
        window.location.href = 'index.html';
      })
      .catch((err) => alert(err.message));
  });
}

// Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        alert('Logged in successfully');
        window.location.href = 'index.html';
      })
      .catch((err) => alert(err.message));
  });
}

// Logout
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
      alert('Logged out');
      window.location.href = 'index.html';
    });
  });
}

// Auth State Change
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User logged in:', user.email);
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    console.log('User logged out');
    localStorage.removeItem('user');
  }
});
