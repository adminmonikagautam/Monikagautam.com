const API_KEY = "19e3ac4e";
const container = document.getElementById("watchlistContainer");

async function loadWatchlist() {
  let list = JSON.parse(localStorage.getItem("watchlist")) || [];

  if (list.length === 0) {
    container.innerHTML = "<p>No movies in your watchlist.</p>";
    return;
  }

  for (let id of list) {
    const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
    const movie = await res.json();

    container.innerHTML += `
      <div class="movie">
        <img src="${movie.Poster}" alt="${movie.Title}" />
        <h3>${movie.Title}</h3>
        <button onclick="removeFromWatchlist('${id}')">Remove</button>
      </div>
    `;
  }
}

function removeFromWatchlist(id) {
  let list = JSON.parse(localStorage.getItem("watchlist"));
  list = list.filter(mid => mid !== id);
  localStorage.setItem("watchlist", JSON.stringify(list));
  location.reload();
}

loadWatchlist();
