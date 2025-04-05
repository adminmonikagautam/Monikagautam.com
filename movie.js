const tmdbApiKey = '71a0cb256ce6112edd9d3fd192bab592';
const omdbApiKey = '19e3ac4e';
const imageBaseURL = 'https://image.tmdb.org/t/p/w500';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieId = urlParams.get('id');

const detailsContainer = document.getElementById('movie-details');

async function loadMovieDetails() {
  try {
    // TMDb call
    const tmdbRes = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbApiKey}`);
    const tmdbData = await tmdbRes.json();

    const title = tmdbData.title;
    const year = tmdbData.release_date?.slice(0, 4);

    // OMDb call
    const omdbRes = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${year}&apikey=${omdbApiKey}`);
    const omdbData = await omdbRes.json();

    const poster = tmdbData.poster_path ? imageBaseURL + tmdbData.poster_path : omdbData.Poster;

    detailsContainer.innerHTML = `
      <div class="movie-detail-card">
        <img src="${poster}" alt="${title}" />
        <div class="movie-info">
          <h2>${title} (${year})</h2>
          <p><strong>IMDb:</strong> ${omdbData.imdbRating}/10</p>
          <p><strong>Runtime:</strong> ${omdbData.Runtime}</p>
          <p><strong>Genre:</strong> ${omdbData.Genre}</p>
          <p><strong>Director:</strong> ${omdbData.Director}</p>
          <p><strong>Actors:</strong> ${omdbData.Actors}</p>
          <p><strong>Plot:</strong> ${omdbData.Plot}</p>
        </div>
      </div>
    `;
  } catch (err) {
    detailsContainer.innerHTML = `<p>Error loading movie details.</p>`;
    console.error(err);
  }
}

loadMovieDetails();
