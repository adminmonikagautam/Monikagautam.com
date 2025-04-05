const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");
const tmdbKey = "7e14501d8b8b298c17837054b1eb2f7c";
const omdbKey = "e3431b73";

const movieDetail = document.getElementById("movieDetail");

fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbKey}`)
  .then(res => res.json())
  .then(movie => {
    fetch(`https://www.omdbapi.com/?t=${movie.title}&apikey=${omdbKey}`)
      .then(res => res.json())
      .then(omdb => {
        movieDetail.innerHTML = `
          <h1>${movie.title}</h1>
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
          <p>${movie.overview}</p>
          <p><strong>IMDB Rating:</strong> ${omdb.imdbRating}</p>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${omdb?.Trailer}" frameborder="0" allowfullscreen></iframe>
        `;
      });
  });
