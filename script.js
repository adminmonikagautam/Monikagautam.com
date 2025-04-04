const API_KEY = "19e3ac4e";
const searchInput = document.getElementById("searchInput");
const moviesContainer = document.getElementById("moviesContainer");
const trendingContainer = document.getElementById("trendingMovies");

// Search movies
searchInput.addEventListener("keyup", async () => {
  const query = searchInput.value;
  if (query.length < 3) return;

  const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
  const data = await res.json();

  if (data.Search) {
    moviesContainer.innerHTML = data.Search.map(movie => `
      <div class="movie" onclick="getMovieDetails('${movie.imdbID}')">
        <img src="${movie.Poster}" alt="${movie.Title}" />
        <h3>${movie.Title}</h3>
      </div>
    `).join("");
  }
});

// Trending movies
const trendingIDs = ["tt0111161", "tt0068646", "tt0468569", "tt0109830"];
trendingContainer.innerHTML = trendingIDs.map(id => `
  <div class="movie" onclick="getMovieDetails('${id}')">
    <img src="https://img.omdbapi.com/?i=${id}&apikey=${API_KEY}" />
    <h3>ID: ${id}</h3>
  </div>
`).join("");

function getMovieDetails(id) {
  window.location.href = `movie.html?id=${id}`;
}
