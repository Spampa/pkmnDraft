import { insertMove, playerIndex, enemyIndex, getLastMove } from "../connectionFunctions/APICals.js";
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
    if(playerMove != null) return;
    playerMove = playerPkmn[4 - battleData.player.pkmn].move[index];
    fetch(`https://pokeapi.co/api/v2/move/${playerMove.id}`).then(
        (response) => {
            return response.json();
        }
    ).then((data) => {
        playerMove = data; 
        getDamage(playerMove.power, battleData.enemy.stats).then((damage) => {
            playerMove = damage;
            if(enemyMove == null){
                insertMove(playerIndex + 'mP' + damage).then(response => {

                });
            }
            else{
                insertMove(playerIndex + 'fP' + damage).then(response => {
                    endTurn();
                });
            }
        });
    });
}

const checkMoves = setInterval(() => {
    if(enemyMove == null){
        getLastMove().then(response => {
            if(response?.data?.play?.MOSSA == undefined) return;
            let move = JSON.stringify(response.data.play.MOSSA);
            let moveType = move.substring(1, 4);
            if(moveType == enemyIndex + 'mP'){
                move = move.substring(4, move.length - 1);
                enemyMove = move;
            }
            else if(moveType == enemyIndex + 'fP'){
                move = move.substring(4, move.length - 1);
                enemyMove = move;
                if(playerMove != null && enemyMove != null){
                    insertMove('endTurn');
                    //console.log('Turno finito');
                    endTurn();
                }
            }
        });
    }


}, 200);

function endTurn(){
    /*
    console.log('Danni Nemico: ' + enemyMove);
    console.log('Danni Player: ' + playerMove);
    */
    updateLife(playerMove, enemyMove).then(() => {
        playerMove = null;
        enemyMove = null;
    });
}


