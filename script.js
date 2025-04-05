// Replace with your own TMDb API key
const TMDB_API_KEY = "71a0cb256ce6112edd9d3fd192bab592";
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch and render popular movies on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchPopularMovies();
});

// Fetch Popular Movies
function fetchPopularMovies() {
  fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
    .then((response) => response.json())
    .then((data) => {
      renderMovies(data.results);
    })
    .catch((error) => {
      console.error("Error fetching popular movies:", error);
    });
}

// Search movies
function searchMovies(query) {
  fetch(`${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`)
    .then((response) => response.json())
    .then((data) => {
      renderMovies(data.results);
    })
    .catch((error) => {
      console.error("Error searching movies:", error);
    });
}

// Render movie cards
function renderMovies(movies) {
  const container = document.getElementById("movies-container");
  container.innerHTML = "";

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Rating: ${movie.vote_average}</p>
    `;

    // Movie card click to open details
    card.addEventListener("click", () => {
      window.location.href = `movie.html?id=${movie.id}`;
    });

    container.appendChild(card);
  });
}

// Search bar handler
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        searchMovies(query);
      }
    }
  });
}
