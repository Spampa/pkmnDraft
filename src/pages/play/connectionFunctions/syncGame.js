import { getLastMove, getMatchMove, insertMove, playerIndex, enemyIndex, matchData, matchList } from "./APICals.js";
import { playerPkmn, enemyPkmn, initPokemon, addToDraft, draftEnd, updatePkmnUI } from "../draft.js";


const syncMatch = setInterval(checkUpdate, 200);
export let draftPkmn = [];
let setDraftPkmn = false;
let pkmnInit = false;

function checkUpdate() {
    if (!setDraftPkmn) {
        getLastMove().then(response => {
            if (response?.data?.play?.MOSSA == undefined) return;
            let mossa = JSON.stringify(response.data.play.MOSSA);
            mossa = mossa.substring(1, mossa.length - 1);
            mossa = mossa.split(',');
            draftPkmn = [];
            if (playerIndex == 0) {
                for (let i = 0; i < 4; i++) {
                    draftPkmn.push(mossa[i]);
                }
            }
            else {
                for (let i = 4; i < 8; i++) {
                    draftPkmn.push(mossa[i]);
                }
            }

            addToDraft();
            setDraftPkmn = true;
        });
    }
    else if(draftEnd == true && !pkmnInit){
        getMatchMove().then(response => {
            for (let i = 0; i < response.data.moves.length; i++) {
                let mossa = JSON.stringify(response.data.moves[i].MOSSA);
                let moveType = mossa.substring(1, 4);
                if (moveType == enemyIndex + 'aP') {
                    mossa = mossa.substring(4, mossa.length - 1);
                    mossa = mossa.split(',');
                    for(let i = 0; i < 2; i++){
                        playerPkmn.push(mossa[i]);
                        enemyPkmn.unshift(mossa[3 - i]);
                    }
                    pkmnInit = true;
                    initPokemon().then(() => {
                        updatePkmnUI(0,0);
                    });
                    clearInterval(syncMatch);
                    return;
                }
            }
        });
    }
}

const checkPlayers = setInterval(() => {
    if (matchData?.ID == undefined) return;
    matchList().then(response => {
        for (let i = 0; i < response.data.length; i++) {
            if (matchData.ID == response.data[i].ID) {
                return;
            }
        }
        console.log('Partita iniziata');
        console.log(idP2);

        let move = '';
        for (let i = 0; i < draftPkmn.length; i++) {
            move += draftPkmn[i] + ',';
        }
        move = move.substring(0, move.length - 1);
        insertMove(move);
        clearInterval(checkPlayers);
    });

}, 200);