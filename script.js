const apiKey = "71a0cb256ce6112edd9d3fd192bab592";
let page = 1;
let currentGenre = "";

document.getElementById("loadMore").addEventListener("click", () => {
  page++;
  fetchMovies();
});

document.getElementById("search").addEventListener("input", (e) => {
  const query = e.target.value;
  page = 1;
  if (query) {
    fetchSearchResults(query);
  } else {
    fetchMovies();
  }
});

function fetchMovies() {
  let url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&page=${page}`;
  if (currentGenre) {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${currentGenre}&page=${page}`;
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      displayMovies(data.results);
    });
}

function fetchSearchResults(query) {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("movieList").innerHTML = "";
      displayMovies(data.results);
    });
}

function displayMovies(movies) {
  const list = document.getElementById("movieList");
  movies.forEach(movie => {
    const div = document.createElement("div");
    div.className = "movie";
    div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
    `;
    div.onclick = () => {
      localStorage.setItem("movieId", movie.id);
      window.location.href = "movie.html";
    };
    list.appendChild(div);
  });
}

function fetchGenres() {
  fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      const genreDiv = document.getElementById("genreFilter");
      data.genres.forEach(genre => {
        const btn = document.createElement("button");
        btn.innerText = genre.name;
        btn.onclick = () => {
          currentGenre = genre.id;
          page = 1;
          document.getElementById("movieList").innerHTML = "";
          fetchMovies();
        };
        genreDiv.appendChild(btn);
      });
    });
}

fetchGenres();
fetchMovies();
