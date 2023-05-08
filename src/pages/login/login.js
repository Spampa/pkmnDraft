import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { setUsername } from "../../../getData.js";

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
const loginBtn = document.getElementById("login");
const errore = document.getElementById("error");

loginBtn.addEventListener('click', () => {
    const mail = document.getElementById("mail").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, mail, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem('user_id', user.uid);
            setUsername("../../index.html");
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == "auth/wrong-password") {
                errore.innerHTML = "Password errata";
            }
            else if (errorCode == "auth/user-not-found") {
                errore.innerHTML = "Utente non trovato";
            }
            else if (errorCode == "auth/invalid-email") {
                errore.innerHTML = "Email non valida";
            }
        });
})