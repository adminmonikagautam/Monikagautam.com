document.addEventListener("DOMContentLoaded", function () {
    const movieContainer = document.querySelector(".movie-container");

    // Dummy movie data
    const movies = [
        { title: "Inception", image: "inception.jpg", rating: "8.8" },
        { title: "Interstellar", image: "interstellar.jpg", rating: "8.6" },
        { title: "The Dark Knight", image: "dark_knight.jpg", rating: "9.0" },
        { title: "Tenet", image: "tenet.jpg", rating: "7.4" }
    ];

    function displayMovies() {
        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            
            movieCard.innerHTML = `
                <img src="images/${movie.image}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>⭐ ${movie.rating}</p>
            `;

            movieContainer.appendChild(movieCard);
        });
    }

    displayMovies();
});
