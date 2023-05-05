import { getLastMove, getMatchMove, insertMove, playerIndex } from "./connectionFunction.js";
import { playerPkmn, enemyPkmn } from "./draft.js";


setInterval(checkUpdate, 1000);
let pkmnInit = false;

let enemyIndex;
let move;

function checkUpdate(){
    if(!pkmnInit){
        if(playerIndex == 0){
            enemyIndex = 1;
        }
        else{
            enemyIndex = 0;
        }

        getMatchMove().then(response => {
            for(let i = 0; i < response.data.moves.length; i++){
                move = JSON.stringify(response.data.moves[i].MOSSA);
                if(move.substring(1, 2) == enemyIndex){
                    console.log(move);
                    let mossa = move.substring(4, move.length - 1);
                    playerPkmn.push(mossa.substring(0, mossa.indexOf(',')));
                    mossa = mossa.substring(mossa.indexOf(',') + 1, mossa.length);
                    playerPkmn.push(mossa);
                    console.log(playerPkmn);
                    pkmnInit = true;
                    insertMove(playerIndex + 'aP' + playerPkmn[0] + ',' + playerPkmn[1] + ',' + playerPkmn[2] + ',' + playerPkmn[3]);
                    return;
                }
            }
        });
    }

    getLastMove().then(response => {
        if(response != undefined){
            let mossa = JSON.stringify(response.data.play.MOSSA);
            let moveType = mossa.substring(1, 4);
            mossa = mossa.substring(4, mossa.length - 1);
            console.log(moveType);
            if(moveType == enemyIndex+"aP"){
                enemyPkmn = [];
                mossa = mossa.substring(0, mossa.length - 1);
                for(let i = 0; i < 4; i++){
                    enemyPkmn.push(mossa.substring(0, mossa.indexOf(',')));
                    mossa = mossa.substring(mossa.indexOf(',') + 1, mossa.length);
                }
                console.log(enemyPkmn);
            }
        }
    });


    /*
    getLastMove().then(response => {
        //fai il parse di response.data.play.MOSSA
        let mossa = JSON.stringify(response.data.play.MOSSA);
        let moveType = mossa.substring(1, 4);
        mossa = mossa.substring(4, mossa.length - 1);

        playerPkmn.push(mossa.substring(0, mossa.indexOf(',')));
        mossa = mossa.substring(mossa.indexOf(',') + 1, mossa.length);
        playerPkmn.push(mossa);
        console.log(playerPkmn);

    });
    */
}