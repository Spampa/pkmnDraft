let credentials = btoa('4ID:Grena');
let auth = {'Authorization': 'Basic ' + credentials};
export let playerIndex;
export let enemyIndex
export let matchData;

const createMatch = async () => {
    let data = await fetch(`https://classe5ID.altervista.org/games/partita/${'pkmn_'+localStorage.getItem('user_id')}`,{
        method: 'POST',
        headers: auth,
    });
    playerIndex = 0;
    enemyIndex = 1;
    data = await data.json();
    return data;
}

export const matchList = async () => {
    let data = await fetch(`https://classe5ID.altervista.org/games/partita`,{
        method: 'GET',
        headers: auth,
    });
    data = await data.json();
    return data;
}

const joinGame = async (id) => {
    console.log(id);
    let data = await fetch(`https://classe5ID.altervista.org/games/join/${id}/${'pkmn_'+localStorage.getItem('user_id')}`,{
        method: 'POST',
        headers: auth,
    });
    playerIndex = 1;
    enemyIndex = 0;
    data = await data.json();
    return data;
}

export const insertMove = async (move) => {
    let data = await fetch(`https://classe5ID.altervista.org/games/mossa/${matchData.data.id}/${'pkmn_'+localStorage.getItem('user_id')}/${move}`, {
        method: 'POST',
        headers: auth,
    });
    data = await data.json();
    return data;
}

export const getLastMove = async () => {
    let data = await fetch(`https://classe5ID.altervista.org/games/mossa/${matchData.data.id}`, {
        method: 'GET',
        headers: auth,
    });
    data = await data.json();
    return data;
}

export const getMatchMove = async () => {
    let data = await fetch(`https://classe5ID.altervista.org/games/mosse/${matchData.data.id}`, {
        method: 'GET',
        headers: auth,
    });
    data = await data.json();
    return data;
}


export const searchMatch = async () => {
    matchList().then(response => {
        for(let i = 0; i < response.data.length; i++){
            if(response.data[i].PLAYER1.substring(0,5) == 'pkmn_'){
                if(response.data[i].PLAYER2 == null){
                    joinGame(response.data[i].ID).then(response => {
                        matchData = response;
                    });
                    console.log("Match joined");
                    return 0;
                }
            }
        }
        createMatch().then(response => {
            matchData = response;
            matchList().then(response => {
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i]?.ID != undefined){
                        if(response.data[i].ID == matchData.data.id){
                            matchData = response.data[i];
                        }
                    }
                }
            });
            console.log("Match created");
            
        });
    });

}



