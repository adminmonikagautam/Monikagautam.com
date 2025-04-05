// script.js (Final version with all features)

const TMDB_API_KEY = "71a0cb256ce6112edd9d3fd192bab592"; const OMDB_API_KEY = "19e3ac4e"; const TMDB_BASE_URL = "https://api.themoviedb.org/3"; const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

// Load trending or search document.addEventListener("DOMContentLoaded", () => { const movieList = document.getElementById("movieList"); const searchInput = document.getElementById("searchInput");

if (movieList) loadTrending(); if (searchInput) { searchInput.addEventListener("input", () => { const query = searchInput.value.trim(); if (query.length > 1) searchMovies(query); else loadTrending(); }); }

const movieDetails = document.getElementById("movieDetails"); if (movieDetails) loadMovieDetails();

const watchlistContainer = document.getElementById("watchlistContainer"); if (watchlistContainer) loadWatchlist();

setupAuth(); setupComments(); });

function loadTrending() { fetch(${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}) .then(res => res.json()) .then(data => displayMovies(data.results)) .catch(console.error); }

function searchMovies(query) { fetch(${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}) .then(res => res.json()) .then(data => displayMovies(data.results)) .catch(console.error); }

function displayMovies(movies) { const movieList = document.getElementById("movieList"); movieList.innerHTML = movies.map(movie => <div class="col-md-3 mb-4"> <div class="card bg-secondary text-white h-100"> <img src="${IMG_BASE_URL + movie.poster_path}" class="card-img-top" alt="${movie.title}" /> <div class="card-body"> <h5 class="card-title">${movie.title}</h5> <button onclick="viewDetails(${movie.id})" class="btn btn-light btn-sm">View Details</button> </div> </div> </div>).join(""); }

function viewDetails(id) { localStorage.setItem("selectedMovieId", id); window.location.href = "movie.html"; }

function loadMovieDetails() { const id = localStorage.getItem("selectedMovieId"); if (!id) return;

fetch(${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos,watch/providers) .then(res => res.json()) .then(movie => { fetch(https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${movie.title}) .then(res => res.json()) .then(omdb => renderMovieDetails(movie, omdb)) .catch(console.error); }); }

function renderMovieDetails(movie, omdb) { const trailer = movie.videos.results.find(v => v.type === "Trailer" && v.site === "YouTube"); const provider = movie["watch/providers"].results.IN?.flatrate?.[0];

document.getElementById("movieDetails").innerHTML = <div class="row"> <div class="col-md-4"> <img src="${IMG_BASE_URL + movie.poster_path}" class="img-fluid" alt="${movie.title}" /> </div> <div class="col-md-8"> <h2>${movie.title}</h2> <p>${movie.overview}</p> <p><strong>Release:</strong> ${movie.release_date}</p> <p><strong>IMDb:</strong> ${omdb.imdbRating}</p> ${provider ?<p><strong>Watch on:</strong> ${provider.provider_name}</p>: ""} <button onclick="addToWatchlist(${movie.id}, '${movie.title}', '${movie.poster_path}')" class="btn btn-outline-success">Add to Watchlist</button> ${trailer ?<div class="mt-3"><iframe width="100%" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe></div>: ""} </div> </div>; }

function addToWatchlist(id, title, posterPath) { const list = JSON.parse(localStorage.getItem("watchlist")) || []; if (!list.some(m => m.id === id)) { list.push({ id, title, posterPath }); localStorage.setItem("watchlist", JSON.stringify(list)); alert("Added to watchlist!"); } }

function loadWatchlist() { const list = JSON.parse(localStorage.getItem("watchlist")) || []; const container = document.getElementById("watchlistContainer"); container.innerHTML = list.length ? list.map(m => <div class="col-md-3 mb-4"> <div class="card bg-secondary text-white"> <img src="${IMG_BASE_URL + m.posterPath}" class="card-img-top" alt="${m.title}" /> <div class="card-body"> <h5 class="card-title">${m.title}</h5> <button onclick="viewDetails(${m.id})" class="btn btn-light btn-sm">View Details</button> </div> </div> </div>).join("") : "<p>No movies in watchlist.</p>"; }

function setupAuth() { const signupForm = document.getElementById("signupForm"); const loginForm = document.getElementById("loginForm");

if (signupForm) { signupForm.addEventListener("submit", e => { e.preventDefault(); const user = { username: document.getElementById("signupUsername").value, password: document.getElementById("signupPassword").value }; localStorage.setItem("user", JSON.stringify(user)); alert("Account created! Login now."); window.location.href = "login.html"; }); }

if (loginForm) { loginForm.addEventListener("submit", e => { e.preventDefault(); const username = document.getElementById("loginUsername").value; const password = document.getElementById("loginPassword").value; const user = JSON.parse(localStorage.getItem("user")); if (user?.username === username && user?.password === password) { alert("Logged in!"); window.location.href = "index.html"; } else { alert("Invalid credentials"); } }); } }

function setupComments() { const form = document.getElementById("commentForm"); const list = document.getElementById("commentList"); const movieId = localStorage.getItem("selectedMovieId");

if (!form || !list || !movieId) return;

const comments = JSON.parse(localStorage.getItem(comments_${movieId})) || []; list.innerHTML = comments.map(c => <li class='list-group-item bg-dark text-white'><strong>${c.user}:</strong> ${c.text}</li>).join("");

form.addEventListener("submit", e => { e.preventDefault(); const user = document.getElementById("username").value; const text = document.getElementById("commentText").value; const newComment = { user, text }; comments.push(newComment); localStorage.setItem(comments_${movieId}, JSON.stringify(comments)); location.reload(); }); }

