import { playerPkmn, enemyPkmn,  lifeBar } from "./draft.js";
import { pkmnData } from "./pkmnData.js";
const level = 100;

let battleData = {
    'player':{
        'lifeMax' : 0,
        'life' : 0,
        'pkmn' : 4,
    },
    'enemy':{
        'lifeMax' : 0,
        'life' : 0,
        'pkmn' : 4,
    }
}

export function initStats(){
    fetch(`https://pokeapi.co/api/v2/pokemon/${playerPkmn[4 - battleData.player.pkmn].name}`).then(
        (response) => {
            return response.json();
        }
    ).then((data) => {
        let actualPkmnStats = data.stats;
        battleData.player.lifeMax = Math.floor((actualPkmnStats[0].base_stat * 2 / 100) * level + 10);
        battleData.player.life = battleData.player.lifeMax;
        lifeBar[0].innerHTML = 'HP ' + battleData.player.life + '/' + battleData.player.lifeMax;
        console.log(actualPkmnStats);
    });
    fetch(`https://pokeapi.co/api/v2/pokemon/${enemyPkmn[4 - battleData.enemy.pkmn].name}`).then(
        (response) => {
            return response.json();
        }
    ).then((data) => {
        let actualPkmnStats = data.stats;
        battleData.enemy.lifeMax = Math.floor((actualPkmnStats[0].base_stat * 2 / 100) * level + 10);
        battleData.enemy.life = battleData.enemy.lifeMax;
        lifeBar[1].innerHTML = 'HP ' + battleData.enemy.life + '/' + battleData.enemy.lifeMax;
        console.log(actualPkmnStats);
    });
}
