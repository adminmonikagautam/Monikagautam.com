import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { doc, setDoc, getDoc, collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const TMDB_API_KEY = '71a0cb256ce6112edd9d3fd192bab592';
const OMDB_API_KEY = '19e3ac4e';
const movieId = new URLSearchParams(window.location.search).get('id');
let currentUserId = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUserId = user.uid;
    document.getElementById('logoutBtn').style.display = 'block';
  } else {
    currentUserId = null;
    document.getElementById('logoutBtn').style.display = 'none';
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  auth.signOut().then(() => {
    window.location.href = 'login.html';
  });
});

async function fetchMovieDetails() {
  const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos`;
  const response = await fetch(tmdbUrl);
  const movie = await response.json();

  const omdbUrl = `https://www.omdbapi.com/?i=${movie.imdb_id}&apikey=${OMDB_API_KEY}`;
  const omdbResponse = await fetch(omdbUrl);
  const omdbData = await omdbResponse.json();

  document.getElementById('movieDetails').innerHTML = `
    <h2>${movie.title}</h2>
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
    <p><strong>Release Date:</strong> ${movie.release_date}</p>
    <p><strong>Overview:</strong> ${movie.overview}</p>
    <p><strong>TMDb Rating:</strong> ${movie.vote_average}</p>
    <p><strong>IMDb Rating:</strong> ${omdbData.imdbRating || 'N/A'}</p>
  `;

  const trailer = movie.videos.results.find(video => video.type === "Trailer" && video.site === "YouTube");
  if (trailer) {
    document.getElementById('trailerContainer').innerHTML = `
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>
    `;
  }
}

async function addToWatchlist() {
  if (!currentUserId) {
    alert("Login to add to your watchlist.");
    return;
  }

  const watchlistRef = doc(db, 'watchlists', `${currentUserId}_${movieId}`);
  await setDoc(watchlistRef, {
    userId: currentUserId,
    movieId,
    addedAt: new Date().toISOString()
  });

  alert('Added to Watchlist!');
}

document.getElementById('addToWatchlist').addEventListener('click', addToWatchlist);

// Comments System
const commentList = document.getElementById('commentList');
const commentInput = document.getElementById('commentInput');
const submitComment = document.getElementById('submitComment');

submitComment.addEventListener('click', async () => {
  const text = commentInput.value.trim();
  if (!text || !currentUserId) return alert('Login and enter a comment.');

  await addDoc(collection(db, 'comments'), {
    movieId,
    userId: currentUserId,
    text,
    timestamp: new Date()
  });

  commentInput.value = '';
});

const q = query(collection(db, 'comments'), orderBy('timestamp', 'desc'));
onSnapshot(q, (snapshot) => {
  commentList.innerHTML = '';
  snapshot.docs
    .filter(doc => doc.data().movieId === movieId)
    .forEach(doc => {
      const { text, timestamp } = doc.data();
      const time = new Date(timestamp.seconds * 1000).toLocaleString();
      const div = document.createElement('div');
      div.innerHTML = `<p>${text}</p><small>${time}</small>`;
      commentList.appendChild(div);
    });
});

fetchMovieDetails();
