import { getLastMove, getMatchMove, insertMove, playerIndex, enemyIndex, matchData, matchList } from "./connectionFunction.js";
import { playerPkmn, enemyPkmn, loadingScreen, draft, initPokemon, addToDraft } from "./draft.js";


setInterval(checkUpdate, 200);
export let draftPkmn = [];
let setDraftPkmn = false;
let pkmnInit = false;
let enemyPkmnInit = false;
let move;

const game = document.getElementById('game');

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
    else if (!pkmnInit) {
        getMatchMove().then(response => {
            for (let i = 0; i < response.data.moves.length; i++) {
                let mossa = JSON.stringify(response.data.moves[i].MOSSA);
                let moveType = mossa.substring(1, 4);
                if (moveType == enemyIndex + 'pP') {
                    mossa = mossa.substring(4, mossa.length - 1);
                    playerPkmn.push(mossa.substring(0, mossa.indexOf(',')));
                    mossa = mossa.substring(mossa.indexOf(',') + 1, mossa.length);
                    playerPkmn.push(mossa);
                    pkmnInit = true;
                    insertMove(playerIndex + 'eP' + playerPkmn[2] + ',' + playerPkmn[3]);
                    console.log(playerPkmn);
                    return;
                }
            }
        });
    }
    else if (!enemyPkmnInit) {
            getMatchMove().then(response => {
                for (let i = 0; i < response.data.moves.length; i++) {
                    let mossa = JSON.stringify(response.data.moves[i].MOSSA);
                    let moveType = mossa.substring(1, 4);
                    if (moveType == enemyIndex + 'eP') {
                        mossa = mossa.substring(4, mossa.length - 1);
                        enemyPkmn.unshift(mossa.substring(0, mossa.indexOf(',')));
                        mossa = mossa.substring(mossa.indexOf(',') + 1, mossa.length);
                        enemyPkmn.unshift(mossa);
                        let temp = enemyPkmn[0];
                        enemyPkmn[0] = enemyPkmn[1];
                        enemyPkmn[1] = temp;
                        enemyPkmnInit = true;

                        document.getElementById('game').classList.remove('hidden');
                        document.getElementById('preGame').classList.add('hidden');
                        initPokemon();
                        return;
                    }
                }

            }).catch(error => {

            });

        }
        else {

        }
    }

    let checkPlayers = setInterval(() => {
        if (matchData?.ID == undefined) return;
        matchList().then(response => {
            for (let i = 0; i < response.data.length; i++) {
                if (matchData.ID == response.data[i].ID) {
                    console.log('Nessuno si è unito alla partita');
                    return;
                }
            }
            console.log('Partita iniziata');

            let move = '';
            for (let i = 0; i < draftPkmn.length; i++) {
                move += draftPkmn[i] + ',';
            }
            move = move.substring(0, move.length - 1);
            insertMove(move);
            clearInterval(checkPlayers);
        });

    }, 200);