document.addEventListener("DOMContentLoaded", () => {
  const movies = [
    {
      title: "The Dark Knight",
      year: 2008,
      rating: 9.0,
      image: "images/dark-knight.jpg",
    },
    {
      title: "Inception",
      year: 2010,
      rating: 8.8,
      image: "images/inception.jpg",
    },
    {
      title: "Interstellar",
      year: 2014,
      rating: 8.6,
      image: "images/interstellar.jpg",
    },
  ];

  const movieContainer = document.getElementById("movie-container");

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Year: ${movie.year}</p>
      <p>Rating: ${movie.rating}</p>
    `;

    movieContainer.appendChild(card);
  });
});
