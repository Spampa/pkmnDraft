import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase , ref , set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const register = document.getElementById("register");

register.addEventListener("click", () => {
  const mail = document.getElementById("mail").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;

  createUserWithEmailAndPassword(auth, mail, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      writeUserData(user.uid, username, mail);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errore = document.getElementById("error");
      if(errorCode == "auth/invalid-email"){
        errore.innerHTML = "Email non valida";
      }
      else if(errorCode == "auth/weak-password"){
        errore.innerHTML = "Password troppo debole";
      }
      else if(errorCode == "auth/email-already-in-use"){
        errore.innerHTML = "Email già in uso";
      }
    });
    
});

function writeUserData(userId, username, email){
  id = userId;
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username : username,
    email : email,
  })
  .then(() => {
    window.location.href = "../../index.html";
  })
  .catch((error) => {
    console.log("Data not saved");
  });
}