import { insertMove, playerIndex, enemyIndex, getLastMove, getMatchMove } from "../connectionFunctions/APICals.js";
import { playerPkmn } from "../draft.js";
import { battleData, getDamage, updateLife } from "./statsFunction.js";

let playerMove = null;
let enemyMove = null;
const moves = document.getElementById('moves');

moves.children[0].addEventListener('click', () => {
    sendMove(0);
});
moves.children[1].addEventListener('click', () => {
    sendMove(1);
});
moves.children[2].addEventListener('click', () => {
    sendMove(2);
});
moves.children[3].addEventListener('click', () => {
    sendMove(3);
});


function sendMove(index) {
    if (playerMove != null) return;
    playerMove = playerPkmn[4 - battleData.player.pkmn].move[index];
    fetch(`https://pokeapi.co/api/v2/move/${playerMove.id}`).then(
        (response) => {
            return response.json();
        }
    ).then((data) => {
        playerMove = data;
        getDamage(playerMove.power, battleData.enemy.stats).then((damage) => {
            playerMove = damage;
            insertMove(playerIndex + 'mP' + damage);
        });
    });
}

let pMove = false;
let eMove = false;

const checkMoves = setInterval(() => {
    if(eMove && pMove) return;
    getMatchMove().then(response => {
        if(response?.data == undefined) return;
        console.log(response.data);

        for (let i = 0; i < 3; i++) {
            if(response?.data?.moves[i]?.MOSSA == undefined) return;

            let move = JSON.stringify(response.data.moves[i].MOSSA);
            let moveType = move.substring(1, 4);
            if (moveType == 'end' && i != 0) {
                break;
            }
            else if (moveType == enemyIndex + 'mP') {
                move = move.substring(4, move.length - 1);
                enemyMove = move;
                eMove = true;
            }
            else if (moveType == playerIndex + 'mP') {
                pMove = true;
            }
        }
        if(eMove && pMove){
            insertMove('endTurn');
            endTurn();
        }
    });
}, 500);

function endTurn() {
    /*
    console.log('Danni Nemico: ' + enemyMove);
    console.log('Danni Player: ' + playerMove);
    */
    updateLife(playerMove, enemyMove).then(() => {
        playerMove = null;
        enemyMove = null;
        eMove = false;
        pMove = false;
    });
}


