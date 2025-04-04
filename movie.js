const movieId = localStorage.getItem("movieId");
const apiKey = "71a0cb256ce6112edd9d3fd192bab592";

fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`)
  .then(res => res.json())
  .then(movie => {
    const div = document.getElementById("movieDetails");
    const trailer = movie.videos.results.find(v => v.type === "Trailer" && v.site === "YouTube");

    div.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
      <h1>${movie.title}</h1>
      <p><strong>Release:</strong> ${movie.release_date}</p>
      <p><strong>Rating:</strong> ${movie.vote_average} / 10</p>
      <p>${movie.overview}</p>
      ${trailer ? `<p><a href="https://www.youtube.com/watch?v=${trailer.key}" target="_blank">Watch Trailer</a></p>` : ""}
    `;
  });
