import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyAvMrtUSY_F6ThumCsWIqB2B0zYakFbjRs",
  authDomain: "pokemon-draft-eea34.firebaseapp.com",
  databaseURL: "https://pokemon-draft-eea34-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pokemon-draft-eea34",
  storageBucket: "pokemon-draft-eea34.appspot.com",
  messagingSenderId: "1015541675256",
  appId: "1:1015541675256:web:16a523f42761aff556b70d",
  measurementId: "G-EYQRM6KP16"
};
initializeApp(firebaseConfig);

// class textUsername
const textUsername = document.getElementsByClassName("textUsername");

const db = getDatabase();
const ID = localStorage.getItem('user_id');
console.log(ID);
const starCountRef = ref(db, 'users/' + ID);


onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  localStorage.setItem('username', data.username);
  console.log('call to firebase');
});


let username = localStorage.getItem('username');

if (username != null) {
  for (let i = 0; i < textUsername.length; i++) {
    textUsername[i].innerHTML = username;
  }
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.classList.remove("hidden");
  const loginBtn = document.getElementById("loginBtn");
  loginBtn.classList.add("hidden");
  const userIcon = document.getElementById("userIcon");
  if (userIcon != null) {
    userIcon.classList.remove("hidden");
  }
}

