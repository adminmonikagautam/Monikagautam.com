const tmdbKey = "71a0cb256ce6112edd9d3fd192bab592";
const omdbKey = "19e3ac4e";

const movieGrid = document.getElementById("movieGrid");
const searchBox = document.getElementById("searchBox");

searchBox.addEventListener("input", () => {
  const query = searchBox.value.trim();
  if (query.length > 2) searchMovies(query);
});

async function searchMovies(query) {
  const tmdbRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${query}`);
  const tmdbData = await tmdbRes.json();
  movieGrid.innerHTML = "";
  tmdbData.results.forEach(async (movie) => {
    const omdbRes = await fetch(`https://www.omdbapi.com/?apikey=${omdbKey}&t=${movie.title}`);
    const omdbData = await omdbRes.json();
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
      <h4>${movie.title}</h4>
      <p>IMDb: ${omdbData.imdbRating || "N/A"}</p>
      <p>${omdbData.Genre || "Genre N/A"}</p>
    `;
    card.addEventListener("click", () => {
      window.open(`https://www.imdb.com/title/${omdbData.imdbID}`, "_blank");
    });
    movieGrid.appendChild(card);
  });
}

function loadPopularMovies() {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbKey}`)
    .then(res => res.json())
    .then(data => {
      movieGrid.innerHTML = "";
      data.results.forEach(movie => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
          <h4>${movie.title}</h4>
          <p>Rating: ${movie.vote_average}</p>
        `;
        card.addEventListener("click", () => {
          window.open(`https://www.themoviedb.org/movie/${movie.id}`, "_blank");
        });
        movieGrid.appendChild(card);
      });
    });
}

loadPopularMovies();
