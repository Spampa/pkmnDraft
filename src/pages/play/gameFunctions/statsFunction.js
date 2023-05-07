import { playerPkmn, enemyPkmn,  lifeBar } from "../draft.js";
import { pkmnData } from "../pkmnData.js";
const level = 100;

let battleData = {
    'player':{
        'lifeMax' : 0,
        'life' : 0,
        'pkmn' : 4,
        'stats' : {},
    },
    'enemy':{
        'lifeMax' : 0,
        'life' : 0,
        'pkmn' : 4,
        'stats' : {},
    }
}

export function initStats(){
    fetch(`https://pokeapi.co/api/v2/pokemon/${playerPkmn[4 - battleData.player.pkmn].name}`).then(
        (response) => {
            return response.json();
        }
    ).then((data) => {
        battleData.player.stats = data.stats;
        battleData.player.lifeMax = Math.floor((battleData.player.stats[0].base_stat * 2 / 100) * level + 10);
        battleData.player.life = battleData.player.lifeMax;
        lifeBar[0].innerHTML = 'HP ' + battleData.player.life + '/' + battleData.player.lifeMax;
        console.log(battleData.player.stats);
    });
    fetch(`https://pokeapi.co/api/v2/pokemon/${enemyPkmn[4 - battleData.enemy.pkmn].name}`).then(
        (response) => {
            return response.json();
        }
    ).then((data) => {
        battleData.enemy.stats = data.stats;
        battleData.enemy.lifeMax = Math.floor((battleData.enemy.stats[0].base_stat * 2 / 100) * level + 10);
        battleData.enemy.life = battleData.enemy.lifeMax;
        lifeBar[1].innerHTML = 'HP ' + battleData.enemy.life + '/' + battleData.enemy.lifeMax;
        console.log(battleData.enemy.stats);
    });
}
