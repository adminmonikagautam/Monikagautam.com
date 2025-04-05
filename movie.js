// Replace with your own TMDb API key
const TMDB_API_KEY = "71a0cb256ce6112edd9d3fd192bab592";
const BASE_URL = "https://api.themoviedb.org/3";

// Get movie ID from URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

// Movie Details Container
const movieDetailsContainer = document.getElementById("movie-details");

if (movieId) {
  fetchMovieDetails(movieId);
} else {
  movieDetailsContainer.innerHTML = "<p>No movie ID provided.</p>";
}

// Fetch movie details
function fetchMovieDetails(id) {
  fetch(`${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`)
    .then((response) => response.json())
    .then((movie) => {
      renderMovieDetails(movie);
    })
    .catch((error) => {
      console.error("Error fetching movie details:", error);
      movieDetailsContainer.innerHTML = "<p>Failed to load movie details. Please try again.</p>";
    });
}

// Render movie details
function renderMovieDetails(movie) {
  movieDetailsContainer.innerHTML = `
    <div class="movie-banner">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <div class="movie-info">
        <h2>${movie.title}</h2>
        <p><strong>Release Date:</strong> ${movie.release_date}</p>
        <p><strong>Rating:</strong> ${movie.vote_average}</p>
        <p><strong>Overview:</strong> ${movie.overview}</p>
        <p><strong>Genres:</strong> ${movie.genres.map((g) => g.name).join(", ")}</p>
        <a href="index.html">← Back to Home</a>
      </div>
    </div>
  `;
}
