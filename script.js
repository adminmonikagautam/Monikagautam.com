const apiKey = "YOUR_API_KEY";
const movieList = document.getElementById("movieList");
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchMovies(query);
  } else {
    loadTrending();
  }
});

function loadTrending() {
  fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => displayMovies(data.results));
}

function fetchMovies(query) {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
    .then(res => res.json())
    .then(data => displayMovies(data.results));
}

function displayMovies(movies) {
  movieList.innerHTML = "";
  movies.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("movie");
    div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <button onclick="goToDetails(${movie.id})">View Details</button>
    `;
    movieList.appendChild(div);
  });
}

function goToDetails(id) {
  localStorage.setItem("movieId", id);
  window.location.href = "movie.html";
}

function logout() {
  // Dummy logout for now
  alert("Logged out!");
}

loadTrending();
