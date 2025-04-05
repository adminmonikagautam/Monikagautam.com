// movie.js
import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const TMDB_KEY = "71a0cb256ce6112edd9d3fd192bab592";
const OMDB_KEY = "19e3ac4e";

const movieId = new URLSearchParams(window.location.search).get("id");
const detailsContainer = document.getElementById("movie-details");
const trailerDiv = document.getElementById("trailer");
const ottLinks = document.getElementById("ott-links");
const commentList = document.getElementById("comment-list");
const commentBox = document.getElementById("user-comment");
const commentBtn = document.getElementById("submit-comment");

let currentUser = null;

// Get TMDb Movie Details
async function fetchMovieDetails() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_KEY}&language=en-US`);
  const data = await res.json();
  showMovieDetails(data);
  fetchTrailer();
  fetchOMDb
