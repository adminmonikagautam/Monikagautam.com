const tmdbApiKey = "71a0cb256ce6112edd9d3fd192bab592";
const omdbApiKey = "19e3ac4e";

// Get Movie ID from URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

const movieDetailsDiv = document.getElementById("movieDetails");

if (!movieId) {
  movieDetailsDiv.innerHTML = "No movie ID provided.";
  throw new Error("No movie ID provided.");
}

// Fetch Movie Details from TMDb
async function getMovieDetails() {
  try {
    const tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbApiKey}&language=en-US`;
    const tmdbRes = await fetch(tmdbUrl);
    const tmdbData = await tmdbRes.json();

    const title = tmdbData.title || tmdbData.name;
    const overview = tmdbData.overview;
    const poster = `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`;
    const releaseDate = tmdbData.release_date;
    const imdbId = tmdbData.imdb_id;

    // Fetch OMDB ratings
    let ratings = "N/A";
    if (imdbId) {
      const omdbUrl = `https://www.omdbapi.com/?i=${imdbId}&apikey=${omdbApiKey}`;
      const omdbRes = await fetch(omdbUrl);
      const omdbData = await omdbRes.json();
      ratings = omdbData.imdbRating || "N/A";
    }

    // Fetch OTT info from JustWatch
    const region = "IN"; // India
    const providerUrl = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${tmdbApiKey}`;
    const providerRes = await fetch(providerUrl);
    const providerData = await providerRes.json();

    const platforms = providerData.results?.[region]?.flatrate || [];
    const logos = platforms.map(p => {
      const link = p.url || "#";
      const logo = `https://images.justwatch.com${p.logo_path}`;
      return `<a href="${link}" target="_blank" title="${p.provider_name}">
                <img src="${logo}" alt="${p.provider_name}" style="height: 30px; margin: 5px;" />
              </a>`;
    });

    movieDetailsDiv.innerHTML = `
      <div class="movie-card">
        <img src="${poster}" alt="${title}" class="poster" />
        <div class="info">
          <h2>${title}</h2>
          <p><strong>Release:</strong> ${releaseDate}</p>
          <p><strong>IMDB Rating:</strong> ${ratings}</p>
          <p>${overview}</p>
          <h4>Available On:</h4>
          <div class="platforms">${logos.join("") || "Not available on streaming"}</div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error:", error);
    movieDetailsDiv.innerHTML = "Failed to load movie details. Please try again.";
  }
}

getMovieDetails();
