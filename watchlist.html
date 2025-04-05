// API Keys const TMDB_API_KEY = "71a0cb256ce6112edd9d3fd192bab592"; const OMDB_API_KEY = "19e3ac4e";

// DOM Elements const movieList = document.getElementById("movieList"); const searchInput = document.getElementById("searchInput"); const watchlistContainer = document.getElementById("watchlistContainer"); const movieDetails = document.getElementById("movieDetails");

// TMDb Image Base const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// ------------------- HOME PAGE ------------------- if (movieList) { fetch(https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}) .then((res) => res.json()) .then((data) => { displayMovies(data.results); }); }

// ------------------- SEARCH ------------------- if (searchInput) { searchInput.addEventListener("keyup", (e) => { if (e.key === "Enter") { const query = searchInput.value.trim(); if (query) { fetch(https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}) .then((res) => res.json()) .then((data) => { movieList.innerHTML = ""; displayMovies(data.results); }); } } }); }

function displayMovies(movies) { movies.forEach((movie) => { const div = document.createElement("div"); div.className = "movie-card"; div.innerHTML = <img src="${movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : 'https://via.placeholder.com/300x450'}" alt="${movie.title}"> <h3>${movie.title}</h3>; div.onclick = () => { window.location.href = movie.html?id=${movie.id}; }; movieList.appendChild(div); }); }

// ------------------- MOVIE DETAILS PAGE ------------------- if (movieDetails) { const params = new URLSearchParams(window.location.search); const movieId = params.get("id");

if (movieId) { fetch(https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos,watch/providers) .then((res) => res.json()) .then((movie) => { fetch(https://www.omdbapi.com/?i=${movie.imdb_id}&apikey=${OMDB_API_KEY}) .then((res) => res.json()) .then((omdb) => { const trailer = movie.videos.results.find(v => v.type === "Trailer" && v.site === "YouTube"); const ott = movie["watch/providers"].results?.IN?.flatrate?.[0]; movieDetails.innerHTML = <img src="${movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : 'https://via.placeholder.com/300x450'}" alt="${movie.title}" /> <h2>${movie.title}</h2> <p><strong>Release:</strong> ${movie.release_date}</p> <p><strong>Genres:</strong> ${movie.genres.map(g => g.name).join(', ')}</p> <p><strong>IMDb:</strong> ${omdb.imdbRating} / 10</p> <p><strong>Overview:</strong> ${movie.overview}</p> ${trailer ?<iframe src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>: ""} ${ott ?<p><strong>Watch on:</strong> ${ott.provider_name}</p><a href="https://www.justwatch.com/in/movie/${movie.title.toLowerCase().replace(/ /g, '-')}">Watch Now</a>: "<p>Not available on OTT</p>"} <button onclick="addToWatchlist(${movie.id}, '${movie.title}', '${movie.poster_path}')">Add to Watchlist</button>; }); }); } else { movieDetails.innerHTML = "<p>Movie not found.</p>"; } }

// ------------------- WATCHLIST ------------------- function addToWatchlist(id, title, poster) { const movie = { id, title, poster }; const stored = JSON.parse(localStorage.getItem("watchlist")) || []; if (!stored.find(m => m.id === id)) { stored.push(movie); localStorage.setItem("watchlist", JSON.stringify(stored)); alert("Added to watchlist"); } else { alert("Already in watchlist"); } }

if (watchlistContainer) { const watchlist = JSON.parse(localStorage.getItem("watchlist")) || []; watchlist.forEach(movie => { const div = document.createElement("div"); div.className = "movie-card"; div.innerHTML = <img src="${movie.poster ? IMAGE_BASE_URL + movie.poster : 'https://via.placeholder.com/300x450'}" alt="${movie.title}" /> <h3>${movie.title}</h3>; div.onclick = () => { window.location.href = movie.html?id=${movie.id}; }; watchlistContainer.appendChild(div); }); }

