const tmdbApiKey = "71a0cb256ce6112edd9d3fd192bab592";
const omdbApiKey = "19e3ac4e";
const movieID = localStorage.getItem("movieID");
const movieDetailsDiv = document.getElementById("movieDetails");

async function getTMDbMovie() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${tmdbApiKey}`);
  const movie = await res.json();
  return movie;
}

async function getOMDbMovie(title) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=${omdbApiKey}&t=${encodeURIComponent(title)}`);
  const data = await res.json();
  return data;
}

async function getStreamingPlatforms(title) {
  const res = await fetch(`https://apis.justwatch.com/content/titles/en_IN/popular?query=${encodeURIComponent(title)}`);
  const data = await res.json();
  const offers = data?.items?.[0]?.offers || [];
  return offers;
}

async function showMovieDetails() {
  try {
    const tmdbData = await getTMDbMovie();
    const omdbData = await getOMDbMovie(tmdbData.title);
    const platforms = await getStreamingPlatforms(tmdbData.title);

    let platformHTML = "<p><strong>Available On:</strong> Not found</p>";
    if (platforms.length) {
      const logos = platforms
        .filter(p => p.monetization_type === "flatrate")
        .map(p => `<img src="https://images.justwatch.com${p.package_logo_url}" style="height:30px; margin-right:10px;" />`);
      platformHTML = `<p><strong>Available On:</strong><br>${logos.join("")}</p>`;
    }

    movieDetailsDiv.innerHTML = `
      <h2>${omdbData.Title} (${omdbData.Year})</h2>
      <img src="${omdbData.Poster}" alt="${omdbData.Title}" style="max-width: 200px;" />
      <p><strong>Genre:</strong> ${omdbData.Genre}</p>
      <p><strong>IMDb Rating:</strong> ${omdbData.imdbRating}</p>
      <p><strong>Plot:</strong> ${omdbData.Plot}</p>
      <p><strong>Director:</strong> ${omdbData.Director}</p>
      <p><strong>Cast:</strong> ${omdbData.Actors}</p>
      <p><strong>Runtime:</strong> ${omdbData.Runtime}</p>
      ${platformHTML}
    `;
  } catch (err) {
    movieDetailsDiv.innerHTML = `<p>Failed to load movie details. Please try again.</p>`;
    console.error(err);
  }
}

showMovieDetails();
