const API_KEY = "19e3ac4e";
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

async function fetchMovieDetails() {
  const res = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`);
  const movie = await res.json();

  document.getElementById("movieDetails").innerHTML = `
    <h1>${movie.Title}</h1>
    <img src="${movie.Poster}" alt="${movie.Title}" />
    <p><strong>Year:</strong> ${movie.Year}</p>
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Plot:</strong> ${movie.Plot}</p>
    <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
  `;
}

function addToWatchlist() {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  if (!watchlist.includes(movieId)) {
    watchlist.push(movieId);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert("Movie added to watchlist!");
  }
}

fetchMovieDetails();
