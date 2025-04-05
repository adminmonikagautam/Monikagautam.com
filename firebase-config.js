// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8q0-dKDSY9oxhEfnb4Nij30VZSFfNa34",
  authDomain: "monikagautam-cfbc4.firebaseapp.com",
  projectId: "monikagautam-cfbc4",
  storageBucket: "monikagautam-cfbc4.appspot.com",
  messagingSenderId: "225196060820",
  appId: "1:225196060820:web:7d4002d2a4bcdf46c20481",
  measurementId: "G-4KYML15KJK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Auth
const auth = firebase.auth();

// Google Sign-In
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Handle Sign-In
function signInWithGoogle() {
  auth.signInWithPopup(googleProvider)
    .then(result => {
      const user = result.user;
      alert(`Welcome ${user.displayName}`);
    })
    .catch(error => {
      console.error("Sign-in error", error);
    });
}

// Handle Sign-Out
function signOutUser() {
  auth.signOut()
    .then(() => alert("Signed out"))
    .catch(error => console.error("Sign-out error", error));
}
