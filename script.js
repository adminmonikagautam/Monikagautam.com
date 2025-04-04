const apiKey = "YOUR_API_KEY"; // Replace this with your OMDb API key

async function searchMovies() {
  const query = document.getElementById("searchInput").value;
  const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
  const data = await response.json();

  const moviesContainer = document.getElementById("moviesContainer");
  moviesContainer.innerHTML = "";

  if (data.Search) {
    data.Search.forEach((movie) => {
      const movieDiv = document.createElement("div");
      movieDiv.classList.add("movie");

      movieDiv.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title}" />
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      `;

      moviesContainer.appendChild(movieDiv);
    });
  } else {
    moviesContainer.innerHTML = "<p>No results found.</p>";
  }
}
