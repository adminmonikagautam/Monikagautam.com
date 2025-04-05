const apiKey = "71a0cb256ce6112edd9d3fd192bab592";
const moviesContainer = document.getElementById("moviesContainer");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

document.addEventListener("DOMContentLoaded", () => {
    fetchTrendingMovies();
});

if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query !== "") {
            searchMovies(query);
        }
    });
}

async function fetchTrendingMovies() {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
        const data = await res.json();
        const sorted = data.results.sort((a, b) => b.vote_average - a.vote_average);
        displayMovies(sorted);
    } catch (err) {
        console.error("Error fetching trending movies:", err);
    }
}

async function searchMovies(query) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`);
        const data = await res.json();
        displayMovies(data.results);
    } catch (err) {
        console.error("Error searching movies:", err);
    }
}

function displayMovies(movies) {
    moviesContainer.innerHTML = "";

    if (!movies.length) {
        moviesContainer.innerHTML = "<p>No movies found.</p>";
        return;
    }

    movies.forEach((movie) => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        const image = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image";

        card.innerHTML = `
            <img src="${image}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>⭐ Rating: ${movie.vote_average.toFixed(1)} / 10</p>
            <p>🔥 Popularity: ${Math.round(movie.popularity)}</p>
            <p>📅 Release: ${movie.release_date || "N/A"}</p>
        `;

        moviesContainer.appendChild(card);
    });
}
// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8q0-dKDSY9oxhEfnb4Nij30VZSFfNa34",
  authDomain: "monikagautam-cfbc4.firebaseapp.com",
  projectId: "monikagautam-cfbc4",
  storageBucket: "monikagautam-cfbc4.firebasestorage.app",
  messagingSenderId: "225196060820",
  appId: "1:225196060820:web:7d4002d2a4bcdf46c20481",
  measurementId: "G-4KYML15KJK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log("Firebase Initialized:", app);
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase config (already added above, make sure it's in the file)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const commentSection = document.getElementById("comment-section");
const postComment = document.getElementById("postComment");
const commentInput = document.getElementById("commentInput");
const commentsList = document.getElementById("commentsList");

let currentUser = null;

loginBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("User signed in");
    })
    .catch((error) => {
      console.error(error);
    });
});

logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    console.log("User signed out");
  });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    commentSection.style.display = "block";
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    currentUser = null;
    commentSection.style.display = "none";
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
});

postComment.addEventListener("click", () => {
  const comment = commentInput.value.trim();
  if (comment && currentUser) {
    const commentHTML = `<p><strong>${currentUser.displayName}:</strong> ${comment}</p>`;
    commentsList.innerHTML += commentHTML;
    commentInput.value = "";
  }
});
