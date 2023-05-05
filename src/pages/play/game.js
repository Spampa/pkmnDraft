import { getLastMove, getMatchMove, insertMove, playerIndex, enemyIndex, matchData, matchList } from "./connectionFunction.js";
import { playerPkmn, enemyPkmn, loadingScreen, draft, generateDraftPkmn, randomizeDraft } from "./draft.js";


setInterval(checkUpdate, 1000);
let pkmnInit = false;
let enemyPkmnInit = false;
let move;

function checkUpdate() {
    if (!pkmnInit) {
        getMatchMove().then(response => {
            for(let i = 0; i < response.data.moves.length; i++) {
                let mossa = JSON.stringify(response.data.moves[i].MOSSA);
                let moveType = mossa.substring(1, 4);
                if(moveType == enemyIndex + 'pP'){
                    mossa = mossa.substring(4, mossa.length - 1);
                    playerPkmn.push(mossa.substring(0, mossa.indexOf(',')));
                    mossa = mossa.substring(mossa.indexOf(',') + 1, mossa.length);
                    playerPkmn.push(mossa);
                    pkmnInit = true;
                    insertMove(playerIndex + 'eP' + playerPkmn[0] + ',' + playerPkmn[1]);
                    console.log('player: ' + playerPkmn);
                    return;
                }
            }
        }).catch(error => {
        });
    }
    else if(!enemyPkmnInit) {
        getMatchMove().then(response => {
            for(let i = 0; i < response.data.moves.length; i++) {
                let mossa = JSON.stringify(response.data.moves[i].MOSSA);
                let moveType = mossa.substring(1, 4);
                if(moveType == enemyIndex + 'eP'){
                    mossa = mossa.substring(4, mossa.length - 1);
                    enemyPkmn.unshift(mossa.substring(0, mossa.indexOf(',')));
                    mossa = mossa.substring(mossa.indexOf(',') + 1, mossa.length);
                    enemyPkmn.unshift(mossa);
                    let temp = enemyPkmn[0];
                    enemyPkmn[0] = enemyPkmn[1];
                    enemyPkmn[1] = temp;
                    console.log('player: ' + playerPkmn);
                    console.log('enemy: ' + enemyPkmn);
                    enemyPkmnInit = true;
                    return;
                }
            }
    
        }).catch(error => {
    
        });
        
    }
}

let checkPlayers = setInterval(() => {
    if(matchData?.ID == undefined) return;
    matchList().then(response => {
        for(let i = 0; i < response.data.length; i++){
            if(matchData.ID == response.data[i].ID){
                console.log('Nessuno si è unito alla partita');
                return;
            }            
        }
        loadingScreen.classList.add('hidden');
        draft.classList.remove('hidden');
        draft.classList.add('flex');
        console.log('Partita iniziata');
        clearInterval(checkPlayers);
    });

}, 1000);