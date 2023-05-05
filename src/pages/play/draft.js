import { matchList, searchMatch, insertMove, playerIndex, getLastMove } from "./connectionFunction.js";

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

export const playerPkmn = [];
export const enemyPkmn = [];
const draftPkmn = [];

const imgPath = "../../assets/IMG/sprites/pokemon/";

const playBtn = document.getElementById("playBtn");
const draft = document.getElementById("draft");
const preGame = document.getElementById('preGame');
const game = document.getElementById('game');
let pickCounter = 0;



function randomizeDraft() {
  if (pickCounter == 2) {
    preGame.classList.add('hidden');
    game.classList.remove('hidden');
    initPokemon();
    return;
  }

  draft.children[0].children[0].src = imgPath + draftPkmn[pickCounter * 2] + ".gif";
  draft.children[1].children[0].src = imgPath + draftPkmn[pickCounter * 2 + 1] + ".gif";
}

function generateDraftPkmn() {
  for (let i = 0; i < 4; i++) {
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
  randomizeDraft();
});

draft.children[1].addEventListener('click', () => {
  playerPkmn.push(draftPkmn[pickCounter * 2 + 1]);
  enemyPkmn.push(draftPkmn[pickCounter * 2]);
  pickCounter++;
  randomizeDraft();
});

const moves = document.getElementById('moves');
function initPokemon() {
  const pkmn1 = document.getElementById('pkmn1');
  const pkmn2 = document.getElementById('pkmn2');

  console.log(playerPkmn);
  console.log(enemyPkmn);

  pkmn1.src = imgPath + playerPkmn[0] + ".gif";
  for (let i = 1; i <= 4; i++) {
    fetch('https://pokeapi.co/api/v2/move/' + i)
      .then(response => response.json())
      .then(data => {
        moves.children[i - 1].innerHTML = data.name;
      });
  }

  insertMove(playerIndex + 'eP' + enemyPkmn[0] + ',' + enemyPkmn[1]).then(response => {
    getLastMove();
  });
}

playBtn.addEventListener("click", function () {
  searchMatch();
  document.getElementById('playContainer').classList.add('hidden');
  draft.classList.remove('hidden');
  draft.classList.add('flex');
  generateDraftPkmn();
  randomizeDraft();
});
