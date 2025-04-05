const tmdbKey = "7e14501d8b8b298c17837054b1eb2f7c";
const movieSection = document.getElementById("movieSection");

window.onload = () => {
  fetchPopularMovies();
};

function fetchPopularMovies() {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbKey}`)
    .then(res => res.json())
    .then(data => {
      if (data.results) {
        displayMovies(data.results);
      } else {
        movieSection.innerHTML = "<p>No movies found.</p>";
      }
    })
    .catch(err => {
      console.error("Error fetching popular movies:", err);
      movieSection.innerHTML = "<p>Error loading movies.</p>";
    });
}

function displayMovies(movies) {
  movieSection.innerHTML = "";
  movies.forEach(movie => {
    if (!movie.poster_path) return; // Skip if no poster

    const div = document.createElement("div");
    div.classList.add("movieCard");
    div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
      <h3>${movie.title}</h3>
    `;
    div.onclick = () => showMovieDetails(movie.id);
    movieSection.appendChild(div);
  });
}

function searchMovies() {
  const query = document.getElementById("searchInput").value;
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${query}`)
    .then(res => res.json())
    .then(data => {
      if (data.results) {
        displayMovies(data.results);
      } else {
        movieSection.innerHTML = "<p>No search results.</p>";
      }
    })
    .catch(err => {
      console.error("Error searching:", err);
      movieSection.innerHTML = "<p>Search error.</p>";
    });
}

function showMovieDetails(id) {
  window.location.href = `movie.html?id=${id}`;
}
