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

let moveCount = 0;

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
            insertMove(playerIndex + '' + moveCount + 'mP' + damage);
        });
    });
}

const checkMoves = setInterval(() => {
    getMatchMove().then(response => {
        if(response?.data?.moves[5]?.MOSSA == undefined) return;
        for(let i = 0; i < 5 ; i++){
            let mossa = response.data.moves[i].MOSSA;
            let moveType;
            if(moveCount >= 10){
                moveType = mossa.substring(0, 5);
            }
            else{
                moveType = mossa.substring(0, 4);
            }

            if(moveType == enemyIndex + '' + moveCount + 'mP'){
                if(moveCount >= 10){
                    enemyMove = mossa.substring(5);
                }
                else{
                    enemyMove = mossa.substring(4);
                }
                return;
            }
        }
    });
    if(playerMove != null && enemyMove != null){
        moveCount++;
        endTurn();
    }
}, 500);

function endTurn() {
    /*
    console.log('Danni Nemico: ' + enemyMove);
    console.log('Danni Player: ' + playerMove);
    */
    updateLife(playerMove, enemyMove).then(() => {
        playerMove = null;
        enemyMove = null;
    });
}