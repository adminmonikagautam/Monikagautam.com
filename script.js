// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB8q0-dKDSY9oxhEfnb4Nij30VZSFfNa34",
  authDomain: "monikagautam-cfbc4.firebaseapp.com",
  projectId: "monikagautam-cfbc4",
  storageBucket: "monikagautam-cfbc4.appspot.com",
  messagingSenderId: "225196060820",
  appId: "1:225196060820:web:7d4002d2a4bcdf46c20481",
  measurementId: "G-4KYML15KJK"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Elements
const searchInput = document.getElementById("searchInput");
const resultsGrid = document.getElementById("results");
const modal = document.getElementById("movieModal");
const modalContent = document.querySelector(".modal-content");
const googleBtn = document.getElementById("googleSignIn");
const userInfo = document.getElementById("userInfo");

let currentUser = null;

// Google Sign-In
googleBtn.onclick = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then(res => {
    currentUser = res.user;
    userInfo.textContent = `Signed in as: ${currentUser.displayName}`;
  });
};

// OMDb API key
const OMDB_API_KEY = "53fa7e6c";

// Search on input
searchInput.addEventListener("keyup", e => {
  if (e.key === "Enter") searchMovies(searchInput.value);
});

// Search movies
function searchMovies(query) {
  fetch(`https://www.omdbapi.com/?s=${query}&apikey=${OMDB_API_KEY}`)
    .then(res => res.json())
    .then(data => {
      resultsGrid.innerHTML = "";
      if (data.Search) {
        data.Search.forEach(movie => renderMovieCard(movie));
      } else {
        resultsGrid.innerHTML = "<p>No results found.</p>";
      }
    });
}

// Render movie card
function renderMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
    <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x400"}" />
    <h3>${movie.Title}</h3>
  `;
  card.onclick = () => openModal(movie.imdbID);
  resultsGrid.appendChild(card);
}

// Open modal
function openModal(imdbID) {
  fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}&plot=full`)
    .then(res => res.json())
    .then(data => {
      modal.style.display = "flex";
      modalContent.innerHTML = `
        <span class="modal-close" onclick="closeModal()">&times;</span>
        <h2>${data.Title} (${data.Year})</h2>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        <p><strong>Director:</strong> ${data.Director}</p>
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Rating:</strong> ${data.imdbRating}</p>
        <div><strong>Comments:</strong><div id="comments"></div></div>
        <textarea id="commentBox" rows="2" placeholder="Write a comment..."></textarea>
        <button id="submitComment">Post</button>
      `;

      loadComments(imdbID);
      document.getElementById("submitComment").onclick = () => {
        const text = document.getElementById("commentBox").value;
        if (currentUser && text.trim()) {
          db.collection("comments").add({
            imdbID,
            user: currentUser.displayName,
            text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          }).then(() => loadComments(imdbID));
        }
      };
    });
}

// Load comments
function loadComments(imdbID) {
  const commentContainer = document.getElementById("comments");
  commentContainer.innerHTML = "Loading...";
  db.collection("comments")
    .where("imdbID", "==", imdbID)
    .orderBy("timestamp", "desc")
    .get()
    .then(snapshot => {
      commentContainer.innerHTML = "";
      snapshot.forEach(doc => {
        const c = doc.data();
        commentContainer.innerHTML += `<p><strong>${c.user}:</strong> ${c.text}</p>`;
      });
    });
}

// Close modal
function closeModal() {
  modal.style.display = "none";
}
