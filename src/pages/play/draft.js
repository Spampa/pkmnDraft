import { matchList, searchMatch, insertMove, playerIndex, getLastMove, enemyIndex } from "./connectionFunctions/APICals.js";
import { draftPkmn } from "./connectionFunctions/syncGame.js";
import { pkmnData } from "./pkmnData.js";
import { initStats } from "./gameFunctions/statsFunction.js";

const imgPath = "../../assets/IMG/sprites/pokemon/";
const pkmn = [];
for(let i = 0; i < pkmnData.length; i++){
  pkmn.push(pkmnData[i].id);
}

export let playerPkmn = [];
export let enemyPkmn = [];
export let draftEnd = false;
let actualMoveSet = [];


const playBtn = document.getElementById("playBtn");
export const draft = document.getElementById("draft");
const preGame = document.getElementById('preGame');
const game = document.getElementById('game');
export const loadingScreen = document.getElementById('loadingScreen');
const otherPkmn = document.getElementsByClassName('otherPkmn');
const moves = document.getElementById('moves');
export let lifeBar = document.getElementsByClassName('lifeBar');

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

  //save all data of pokemon in playerPkmn
  let temp = [];
  for(let j = 0; j < playerPkmn.length; j++){
    for(let i = 0; i < pkmnData.length; i++){
      if(pkmnData[i].id == playerPkmn[j]){
        temp.push(pkmnData[i]);
      }
    }
  }
  playerPkmn = temp;

  temp = [];
  for(let j = 0; j < enemyPkmn.length; j++){
    for(let i = 0; i < pkmnData.length; i++){
      if(pkmnData[i].id == enemyPkmn[j]){
        temp.push(pkmnData[i]);
      }
    }
  }
  enemyPkmn = temp;
  initStats();

  initMoves().then( () => {
    preGame.classList.add('hidden');
    game.classList.remove('hidden');
    game.classList.add('grid');
  });
}

async function initMoves(){
  for(let i = 0; i < 4; i++){
    fetch('https://pokeapi.co/api/v2/move/' + playerPkmn[0].move[i].id).then
    (response => response.json()).then(data => {
      setMoveColor(moves.children[i], data.type.name);
      actualMoveSet.push(data);
      moves.children[i].innerHTML = playerPkmn[0].move[i].name;
    });
  }
}



playBtn.addEventListener("click", function () {
  searchMatch();
  document.getElementById('playContainer').classList.add('hidden');
  loadingScreen.classList.remove('hidden');
  loadingScreen.classList.add('grid');
});

function setMoveColor(move, type){
  //change background color of move
  switch(type){
    case 'normal':
      move.style.backgroundColor = '#A8A77A';
      move.addEventListener('mouseleave', () => {
        move.style.backgroundColor = '#A8A77A';
      });
      move.addEventListener('mouseover', () => {
        move.style.backgroundColor = '#C6C6A7';
      });
      break;
    case 'fire':
      move.style.backgroundColor = '#EE8130';
      move.addEventListener('mouseleave', () => {
        move.style.backgroundColor = '#EE8130';
      });
      move.addEventListener('mouseover', () => {
        move.style.backgroundColor = '#F5AC78';
      });
      break;
    case 'water':
      move.style.backgroundColor = '#6390F0';
      move.addEventListener('mouseleave', () => {
        move.style.backgroundColor = '#6390F0';
      });
      move.addEventListener('mouseover', () => {
        move.style.backgroundColor = '#9DB7F5';
      });
      break;
    case 'electric':
      move.style.backgroundColor = '#F7D02C';
      move.addEventListener('mouseleave', () => {
        move.style.backgroundColor = '#F7D02C';
      });
      move.addEventListener('mouseover', () => {
        move.style.backgroundColor = '#FAE078';
      });
      break;
    case 'grass':
      move.style.backgroundColor = '#7AC74C';
      move.addEventListener('mouseleave', () => {
        move.style.backgroundColor = '#7AC74C';
      });
      move.addEventListener('mouseover', () => {
        move.style.backgroundColor = '#A7DB8D';
      });
      break;
    case 'ice':
      move.style.backgroundColor = '#96D9D6';
      move.addEventListener('mouseleave', () => {
        move.style.backgroundColor = '#96D9D6';
      });
      move.addEventListener('mouseover', () => {
        move.style.backgroundColor = '#BCE6E6';
      });
      break;
    case 'fighting':
      move.style.backgroundColor = '#C22E28';
      move.addEventListener('mouseleave', () => {
        move.style.backgroundColor = '#C22E28';
      });
      move.addEventListener('mouseover', () => {
        move.style.backgroundColor = '#D67873';
      });
      break;
    case 'poison':
      move.style.backgroundColor = '#A33EA1';
      move.addEventListener('mouseleave', () => {
        move.style.backgroundColor = '#A33EA1';
      });
      move.addEventListener('mouseover', () => {
        move.style.backgroundColor = '#C183C1';
      });
      move.classList.add('text-white')
      break;
    case 'ground':
      move.style.backgroundColor = '#E2BF65';
      move.addEventListener('mouseleave', () => {
        move.style.backgroundColor = '#E2BF65';
      });	
      move.addEventListener('mouseover', () => {
        move.style.backgroundColor = '#EBD69D';
      });
      break;
    case 'flying':
      move.style.backgroundColor = '#A98FF3';
      move.addEventListener('mouseleave', () => {
        move.style.backgroundColor = '#A98FF3';
      });
      move.addEventListener('mouseover', () => {
        move.style.backgroundColor = '#C6B7F5';
      });
      break;
    case 'psychic':
      move.style.backgroundColor = '#F95587';
      move.addEventListener('mouseleave', () => {
        move.style.backgroundColor = '#F95587';
      });
      move.addEventListener('mouseover', () => {
        move.style.backgroundColor = '#FA92B2';
      });
      move.classList.add('text-white')
      break;
    case 'bug':
      move.style.backgroundColor = '#A6B91A';
      move.addEventListener('mouseleave', () => {
        move.style.backgroundColor = '#A6B91A';
      });
      move.addEventListener('mouseover', () => {
        move.style.backgroundColor = '#C6D16E';
      });
      break;
    case 'rock':
      move.style.backgroundColor = '#B6A136';
      move.addEventListener('mouseleave', () => {
        move.style.backgroundColor = '#B6A136';
      });
      move.addEventListener('mouseover', () => {
        move.style.backgroundColor = '#D1C17D';
      });
      move.classList.add('text-white')
      break;
    case 'ghost':
      move.style.backgroundColor = '#735797';
      move.addEventListener('mouseleave', () => {
        move.style.backgroundColor = '#735797';
      });
      move.addEventListener('mouseover', () => {
        move.style.backgroundColor = '#A292BC';
      });
      move.classList.add('text-white')
      break;
    case 'dragon':
      move.style.backgroundColor = '#6F35FC';
      move.addEventListener('mouseleave', () => {
        move.style.backgroundColor = '#6F35FC';
      });
      move.addEventListener('mouseover', () => {
        move.style.backgroundColor = '#A7A7F8';
      });
      move.classList.add('text-white')
      break;
    case 'dark':
      move.style.backgroundColor = '#705746';
      move.addEventListener('mouseleave', () => {
        move.style.backgroundColor = '#705746';
      });
      move.addEventListener('mouseover', () => {
        move.style.backgroundColor = '#A29288';
      });
      move.classList.add('text-white')
      break;
    case 'steel':
      move.style.backgroundColor = '#B7B7CE';
      move.addEventListener('mouseleave', () => {
        move.style.backgroundColor = '#B7B7CE';
      });
      move.addEventListener('mouseover', () => {
        move.style.backgroundColor = '#D1D1E0';
      });
      break;
    case 'fairy':
      move.style.backgroundColor = '#D685AD';
      move.addEventListener('mouseleave', () => {
        move.style.backgroundColor = '#D685AD';
      });
      move.addEventListener('mouseover', () => {
        move.style.backgroundColor = '#F4BDC9';
      });
      break;
  }
}
