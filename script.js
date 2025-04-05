// Firebase initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign-In
document.getElementById("googleSignIn").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      document.getElementById("userInfo").innerHTML = `Welcome, ${user.displayName}`;
    })
    .catch(error => {
      console.error("Login Error:", error);
    });
});

// OMDb API Integration
const OMDB_API_KEY = "78f6e1f4"; // Replace if needed
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (query.length >= 3) {
    fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`)
      .then(res => res.json())
      .then(data => {
        if (data.Search) {
          resultsContainer.innerHTML = data.Search.map(movie => `
            <div class="movie-card" onclick="showDetails('${movie.imdbID}')">
              <img src="${movie.Poster}" alt="${movie.Title}">
              <h3>${movie.Title}</h3>
              <p>${movie.Year}</p>
            </div>
          `).join('');
        } else {
          resultsContainer.innerHTML = "<p>No movies found.</p>";
        }
      });
  }
});

// Show Detail Modal
window.showDetails = (imdbID) => {
  fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbID}&plot=full`)
    .then(res => res.json())
    .then(movie => {
      const modal = document.getElementById("movieModal");
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close" onclick="closeModal()">&times;</span>
          <h2>${movie.Title} (${movie.Year})</h2>
          <img src="${movie.Poster}" alt="${movie.Title}" />
          <p><strong>IMDB Rating:</strong> ${movie.imdbRating}</p>
          <p><strong>Genre:</strong> ${movie.Genre}</p>
          <p><strong>Plot:</strong> ${movie.Plot}</p>
          <p><strong>Director:</strong> ${movie.Director}</p>
          <p><strong>Actors:</strong> ${movie.Actors}</p>
        </div>
      `;
      modal.style.display = "block";
    });
};

window.closeModal = () => {
  document.getElementById("movieModal").style.display = "none";
};
