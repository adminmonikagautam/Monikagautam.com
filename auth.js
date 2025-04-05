firebase.auth().onAuthStateChanged(user => {
  const profile = document.getElementById("userProfile");
  if (user) {
    profile.innerHTML = `Hello, ${user.displayName}`;
  } else {
    const btn = document.createElement("button");
    btn.innerText = "Sign in with Google";
    btn.onclick = googleLogin;
    profile.appendChild(btn);
  }
});

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}
