// script.js

const tmdbApiKey = "71a0cb256ce6112edd9d3fd192bab592";
const omdbApiKey = "19e3ac4e";

document.addEventListener("DOMContentLoaded", () => {
  fetchTrendingMovies();
});

async function fetchTrendingMovies() {
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${tmdbApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const movies = data.results.slice(0, 12); // Limit to 12 movies

    const container = document.getElementById("movie-container");
    container.innerHTML = "";

    for (const movie of movies) {
      const omdbRating = await getOMDbRating(movie.title);

      const card = document.createElement("div");
      card.classList.add("movie-card");
      card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>TMDb: ${movie.vote_average}/10</p>
        <p>IMDB: ${omdbRating}</p>
      `;
      card.onclick = () => {
        window.location.href = `movie.html?id=${movie.id}`;
      };
      container.appendChild(card);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

async function getOMDbRating(title) {
  const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${omdbApiKey}`);
  const data = await response.json();
  return data.imdbRating || "N/A";
}
