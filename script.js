const tmdbKey = "71a0cb256ce6112edd9d3fd192bab592";
const omdbKey = "19e3ac4e";

document.getElementById('searchInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    const query = e.target.value.trim();
    if (query) fetchMovies(query);
  }
});

function fetchMovies(query) {
  fetch(`https://www.omdbapi.com/?apikey=${omdbKey}&s=${query}`)
    .then(res => res.json())
    .then(data => {
      if (data.Search) renderMovies(data.Search);
    });
}

function renderMovies(movies) {
  const container = document.getElementById('movies-container');
  container.innerHTML = '';
  movies.forEach(movie => {
    const div = document.createElement('div');
    div.className = 'movie-card';
    div.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}" width="100%" />
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;
    div.onclick = () => showMovieDetails(movie.imdbID);
    container.appendChild(div);
  });
}

function showMovieDetails(imdbID) {
  window.open(`https://www.imdb.com/title/${imdbID}`, '_blank');
}
