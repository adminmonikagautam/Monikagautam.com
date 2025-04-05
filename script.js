const apiKey = "71a0cb256ce6112edd9d3fd192bab592";
const movieList = document.getElementById("movieList");
const searchInput = document.getElementById("searchInput");

// Load trending movies on page load
window.onload = () => {
  fetchTrendingMovies();
};

// Search as you type
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (query.length > 2) {
    searchMovies(query);
  } else {
    fetchTrendingMovies();
  }
});

function fetchTrendingMovies() {
  movieList.innerHTML = "<p>Loading...</p>";
  fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      displayMovies(data.results);
    });
}

function searchMovies(query) {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
    .then(res => res.json())
    .then(data => {
      displayMovies(data.results);
    });
}

function displayMovies(movies) {
  movieList.innerHTML = "";
  movies.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("movie-card");
    div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <button onclick="addToWatchlist(${movie.id}, '${movie.title}', '${movie.poster_path}')">+ Watchlist</button>
    `;
    div.onclick = () => {
      localStorage.setItem("movieID", movie.id);
      window.location.href = "movie.html";
    };
    movieList.appendChild(div);
  });
}

function addToWatchlist(id, title, posterPath) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  // Avoid duplicates
  if (!watchlist.find(movie => movie.id === id)) {
    watchlist.push({ id, title, posterPath });
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert(`${title} added to your watchlist!`);
  } else {
    alert("Already in watchlist!");
  }
}
