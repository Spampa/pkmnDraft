const ID = localStorage.getItem('user_id');
const userIcon = document.getElementById('userIcon');
const textUsername = document.getElementById('textUsername');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');

function logout(){
    localStorage.removeItem('user_id');
    textUsername.innerHTML = "";
    userIcon.classList.add('hidden');
    loginBtn.classList.remove('hidden');
    logoutBtn.classList.add('hidden');
}