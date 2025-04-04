document.addEventListener("DOMContentLoaded", () => {
  const movieGrid = document.querySelector(".movie-grid");

  const movies = [
    {
      title: "The Dark Knight",
      year: 2008,
      rating: "9.0",
      image: "images/dark-knight.jpg"
    },
    {
      title: "Inception",
      year: 2010,
      rating: "8.8",
      image: "images/inception.jpg"
    },
    {
      title: "Interstellar",
      year: 2014,
      rating: "8.6",
      image: "images/interstellar.jpg"
    },
    {
      title: "Fight Club",
      year: 1999,
      rating: "8.8",
      image: "images/fight-club.jpg"
    },
    {
      title: "Pulp Fiction",
      year: 1994,
      rating: "8.9",
      image: "images/pulp-fiction.jpg"
    }
  ];

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <img src="${movie.image}" alt="${movie.title}">
      <div class="movie-info">
        <div class="movie-title">${movie.title}</div>
        <div class="movie-year">${movie.year}</div>
        <div class="rating">⭐ ${movie.rating}</div>
      </div>
    `;

    movieGrid.appendChild(card);
  });
});
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const cards = document.querySelectorAll(".movie-card");

  cards.forEach(card => {
    const title = card.querySelector(".movie-title").textContent.toLowerCase();
    if (title.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
