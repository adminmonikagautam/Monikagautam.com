import { logoutUser, checkUserState } from './auth.js';

const TMDB_API_KEY = "71a0cb256ce6112edd9d3fd192bab592";
const OMDB_API_KEY = "19e3ac4e";

// Elements
const trendingContainer = document.getElementById("trendingMovies");
const searchInput = document.getElementById("searchInput");
const logoutBtn = document.getElementById("logoutBtn");

// Check Auth
checkUserState((user) => {
  if (!user && window.location.pathname.includes("index.html")) {
    window.location.href = "login.html";
  }
});

// Logout
if (logoutBtn) {
  logoutBtn.addEventListener("click", logoutUser);
}

// Fetch Trending Movies
async function fetchTrendingMovies() {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`);
  const data = await res.json();
  displayMovies(data.results);
}

// Fetch Search Results
async function searchMovies(query) {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`);
  const data = await res.json();
  displayMovies(data.results);
}

// Get IMDb Rating from OMDb
async function fetchIMDbRating(title) {
  try {
    const res = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`);
    const data = await res.json();
    return data.imdbRating || "N/A";
  } catch {
    return "N/A";
  }
}

// Display Movie Cards
async function displayMovies(movies) {
  trendingContainer.innerHTML = "";

  for (const movie of movies) {
    const imdbRating = await fetchIMDbRating(movie.title);

    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>IMDb: ${imdbRating}</p>
    `;
    card.addEventListener("click", () => {
      localStorage.setItem("movieId", movie.id);
      window.location.href = "movie.html";
    });

    trendingContainer.appendChild(card);
  }
}

// Search Listener
if (searchInput) {
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) searchMovies(query);
    }
  });
}

// Load trending on page load
fetchTrendingMovies();
