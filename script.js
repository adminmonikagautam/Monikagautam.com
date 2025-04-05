const apiKey = '71a0cb256ce6112edd9d3fd192bab592'; // TMDb
const apiURL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
const imageBaseURL = 'https://image.tmdb.org/t/p/w500';

async function fetchTrendingMovies() {
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    const movies = data.results;

    const container = document.getElementById('movies-container');
    container.innerHTML = '';

    movies.forEach(movie => {
      const card = document.createElement('div');
      card.classList.add('movie-card');

      card.innerHTML = `
        <img src="${imageBaseURL + movie.poster_path}" alt="${movie.title}" />
        <div class="movie-info">
          <h3 class="movie-title">${movie.title}</h3>
          <p class="movie-year">${movie.release_date?.slice(0, 4) || 'N/A'}</p>
        </div>
      `;

      // Add click to open movie detail page
      card.addEventListener('click', () => {
        window.location.href = `movie.html?id=${movie.id}`;
      });

      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

fetchTrendingMovies();
