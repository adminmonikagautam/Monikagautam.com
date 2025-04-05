import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc
} from './firebase.js';

// Signup
async function signupUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Initialize Firestore watchlist
    await setDoc(doc(db, "watchlists", user.uid), {
      movies: []
    });

    alert("Signup successful!");
    window.location.href = "index.html";
  } catch (error) {
    alert("Signup failed: " + error.message);
  }
}

// Login
async function loginUser(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    window.location.href = "index.html";
  } catch (error) {
    alert("Login failed: " + error.message);
  }
}

// Logout
async function logoutUser() {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
    window.location.href = "login.html";
  } catch (error) {
    alert("Logout failed: " + error.message);
  }
}

// Auth State Change
function checkUserState(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

// Get current user watchlist from Firestore
async function getUserWatchlist(uid) {
  const docRef = doc(db, "watchlists", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().movies || [];
  } else {
    return [];
  }
}

export {
  signupUser,
  loginUser,
  logoutUser,
  checkUserState,
  getUserWatchlist
};
