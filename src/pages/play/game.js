const pkmn = [
  "003",
  "006",
  "009",
  "018",
  "026",
  "031",
  "034",
  "149",
];

const playerPkmn = [];

const imgPath = "../../assets/IMG/sprites/pokemon/";


let playBtn = document.getElementById("playBtn");
let draft = document.getElementById("draft");
let draftPkmn1 = document.getElementById("draftPkmn1");
let draftPkmn2 = document.getElementById("draftPkmn2");
let pkmn1 = document.getElementById("pkmn1");
let pkmn2 = document.getElementById("pkmn2");

let preGame = document.getElementById("preGame");
let game = document.getElementById("game");

let draftPkmn = [];

playBtn.addEventListener("click", function() {
  document.getElementById('playContainer').classList.add('hidden');
  draft.classList.remove('hidden');
  randomizeDraft();
});

function randomizeDraft(){
  if(pickCount == 2){
    draft.classList.add('hidden');
    preGame.classList.add('hidden');
    game.classList.remove('hidden');

    pkmn1.src = imgPath + playerPkmn[0] + '.gif';
    return;
  }

  //TODO: lista pokemon player
  draftPkmn.push(pkmn[random(pkmn.length)]);
  do{
    draftPkmn.push(pkmn[random(pkmn.length)]);
  }while(draftPkmn[0] === draftPkmn[1]);
  

  draftPkmn1.children[0].src = imgPath + draftPkmn[0] + '.gif';
  draftPkmn2.children[0].src = imgPath + draftPkmn[1] + '.gif';

  pickCount++;
}

function random(s){
  return Math.floor(Math.random() * s);
}

draftPkmn1.addEventListener("click", function(){
  playerPkmn.push(draftPkmn[0]);
  draftPkmn = [];
  randomizeDraft();
});

draftPkmn2.addEventListener("click", function(){
  playerPkmn.push(draftPkmn[1]);
  draftPkmn = [];
  randomizeDraft();
});

let pickCount = 0;










let burger = document.getElementById('burger');
let header = document.getElementById('header');
let inMenuBurger = document.getElementById('inMenuBurger')

burger.addEventListener('click', () => {
  header.classList.remove('invisible');
  inMenuBurger.classList.remove('hidden');
});

inMenuBurger.children[0].addEventListener('click', () => {
  header.classList.add('invisible');
  inMenuBurger.classList.add('hidden');
  console.log("premuto");
});