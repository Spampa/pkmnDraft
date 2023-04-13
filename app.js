import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const textUsername = document.getElementById("textUsername");

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
const db = getDatabase(app);

const usernameRef = ref(db, 'users/' + "" + '/username');
onValue(usernameRef, (snapshot) => {
    const data = snapshot.val(); 
    textUsername.innerHTML = data;
});