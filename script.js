const firebaseConfig = {
  apiKey: "AIzaSyB8q0-dKDSY9oxhEfnb4Nij30VZSFfNa34",
  authDomain: "monikagautam-cfbc4.firebaseapp.com",
  projectId: "monikagautam-cfbc4",
  storageBucket: "monikagautam-cfbc4.appspot.com",
  messagingSenderId: "225196060820",
  appId: "1:225196060820:web:7d4002d2a4bcdf46c20481",
  measurementId: "G-4KYML15KJK"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    alert(`Welcome ${result.user.displayName}`);
  });
}

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    fetchMovies(e.target.value);
  }
});

async function fetchMovies(query) {
  const movieList = document.getElementById("movieList");
  movieList.innerHTML = "Loading...";
  const url = `https://www.omdbapi.com/?apikey=19e3ac4e&s=${query}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.Search) {
    movieList.innerHTML = "";
    data.Search.forEach(movie => {
      movieList.innerHTML += `
        <div class="movie-card">
          <img src="${movie.Poster}" alt="${movie.Title}" />
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
          <button onclick="showDetails('${movie.imdbID}')">Details</button>
        </div>
      `;
    });
  } else {
    movieList.innerHTML = "No movies found.";
  }
}

async function showDetails(id) {
  const res = await fetch(`https://www.omdbapi.com/?apikey=19e3ac4e&i=${id}&plot=full`);
  const movie = await res.json();
  alert(`Title: ${movie.Title}\nRating: ${movie.imdbRating}\nPlot: ${movie.Plot}`);
}
