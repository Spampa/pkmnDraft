import { matchList, searchMatch, insertMove, playerIndex, getLastMove, enemyIndex } from "./connectionFunction.js";
import { draftPkmn } from "./game.js";
import { pkmnData } from "./pkmnData.js";

const imgPath = "../../assets/IMG/sprites/pokemon/";
const pkmn = [];
for(let i = 0; i < pkmnData.length; i++){
  pkmn.push(pkmnData[i].id);
}

export let playerPkmn = [];
export let enemyPkmn = [];
export let draftEnd = false;

const playBtn = document.getElementById("playBtn");
export const draft = document.getElementById("draft");
const preGame = document.getElementById('preGame');
const game = document.getElementById('game');
export const loadingScreen = document.getElementById('loadingScreen');
const otherPkmn = document.getElementsByClassName('otherPkmn');

let pickCounter = 0;



export async function addToDraft() {
  if (pickCounter == 2) {
    draft.classList.add('hidden');
    loadingScreen.classList.remove('hidden');
    loadingScreen.children[1].innerHTML = 'In attesa del tuo avversario';
    insertMove(playerIndex + 'aP' + enemyPkmn[0] + ',' + enemyPkmn[1] + ',' + playerPkmn[0] + ',' + playerPkmn[1]).then( () => {
      getLastMove();
    });
    draftEnd = true;
    return;
  }

  draft.children[0].children[0].src = imgPath + draftPkmn[pickCounter * 2] + ".gif";
  draft.children[1].children[0].src = imgPath + draftPkmn[pickCounter * 2 + 1] + ".gif";
  if(pickCounter == 0){
    loadingScreen.classList.add('hidden');
    draft.classList.remove('hidden');
    draft.classList.add('flex');
  }
}

export function generatePkmn() {
  for (let i = 0; i < 8; i++) {
    let randomPkmn = pkmn[Math.floor(Math.random() * pkmn.length)];
    if (draftPkmn.includes(randomPkmn)) {
      i--;
    }
    else {
      draftPkmn.push(randomPkmn);
    }
  }
}

draft.children[0].addEventListener('click', () => {
  playerPkmn.push(draftPkmn[pickCounter * 2]);
  enemyPkmn.push(draftPkmn[pickCounter * 2 + 1]);
  pickCounter++;
  addToDraft();
});

draft.children[1].addEventListener('click', () => {
  playerPkmn.push(draftPkmn[pickCounter * 2 + 1]);
  enemyPkmn.push(draftPkmn[pickCounter * 2]);
  pickCounter++;
  addToDraft();
});

const moves = document.getElementById('moves');
export function initPokemon() {
  const pkmn1 = document.getElementById('pkmn1');
  const pkmn2 = document.getElementById('pkmn2');

  /*
  console.log('Player Pkmn: ' + playerPkmn);
  console.log('Enemy Pkmn: ' + enemyPkmn);
  */

  pkmn1.src = imgPath + playerPkmn[0] + ".gif";
  pkmn2.src = imgPath + enemyPkmn[0] + ".gif";

  for(let j = 0; j < 2; j++){
    for (let i = 0; i < playerPkmn.length; i++) {
      if(j == 0){
        otherPkmn[j].children[i].children[0].src = imgPath + playerPkmn[i] + ".gif";
      }
      else{
        otherPkmn[j].children[i].children[0].src = imgPath + enemyPkmn[i] + ".gif";
      }

    }
  }
  preGame.classList.add('hidden');
  game.classList.remove('hidden');
  game.classList.add('grid');


  /*
  for (let i = 1; i <= 4; i++) {
    fetch('https://pokeapi.co/api/v2/move/' + i)
      .then(response => response.json())
      .then(data => {
        moves.children[i - 1].innerHTML = data.name;
      });
  }*/
}



playBtn.addEventListener("click", function () {
  searchMatch();
  document.getElementById('playContainer').classList.add('hidden');
  loadingScreen.classList.remove('hidden');
  loadingScreen.classList.add('grid');
});
