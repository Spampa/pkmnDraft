const ID = localStorage.getItem('user_id');
const userIcon = document.getElementById('userIcon');
const textUsername = document.getElementsByClassName('textUsername');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');


function logout(){
    console.log(textUsername);
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');

    for(let i = 0; i < textUsername.length; i++){
        textUsername[i].innerHTML = '';
    }
    userIcon.classList.add('hidden');
    loginBtn.classList.remove('hidden');
    logoutBtn.classList.add('hidden');
}