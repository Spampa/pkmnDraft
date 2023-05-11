import { playerPkmn, enemyPkmn, updatePkmnUI, endGame} from "../draft.js";
import { initMoves } from "./initFunctions.js";
const lifeBar = document.getElementsByClassName('lifeBar');
const level = 100;

export let battleData = {
    'player': {
        'lifeMax': 0,
        'life': 0,
        'pkmn': 1,
        'stats': {},
        'type': '',
    },
    'enemy': {
        'lifeMax': 0,
        'life': 0,
        'pkmn': 1,
        'stats': {},
        'type' : '',
    }
}

export function initStats(pkmn1 = true, pkmn2 = true) {
    if(pkmn1 === true){
        lifeBar[0].children[1].children[0].classList.remove('w-full');
        lifeBar[0].children[1].children[0].style.width = '100%';
    }

    if(pkmn2 === true){
        lifeBar[1].children[1].children[0].classList.remove('w-full');
        lifeBar[1].children[1].children[0].style.width = '100%';
    }

    if(pkmn1 === true){
        fetch(`https://pokeapi.co/api/v2/pokemon/${playerPkmn[4 - battleData.player.pkmn].name}`).then(
            (response) => {
                return response.json();
            }
        ).then((data) => {
            battleData.player.stats = data.stats;
            battleData.player.type = data.types[0].type.name;
            battleData.player.lifeMax = Math.floor((battleData.player.stats[0].base_stat * 2 * level / 100) + level + 10);
            battleData.player.life = battleData.player.lifeMax;
            lifeBar[0].children[0].children[0].innerHTML = 'HP ' + battleData.player.life + '/' + battleData.player.lifeMax;
        });
    }

    if(pkmn2 === true){
        fetch(`https://pokeapi.co/api/v2/pokemon/${enemyPkmn[4 - battleData.enemy.pkmn].name}`).then(
            (response) => {
                return response.json();
            }
        ).then((data) => {
            battleData.enemy.stats = data.stats;
            battleData.enemy.type = data.types[0].type.name;
            battleData.enemy.lifeMax = Math.floor((battleData.enemy.stats[0].base_stat * 2 * level / 100) + level + 10);
            battleData.enemy.life = battleData.enemy.lifeMax;
            lifeBar[1].children[0].children[0].innerHTML = 'HP ' + battleData.enemy.life + '/' + battleData.enemy.lifeMax;
        });
    }
}

export async function getDamage(power, stats, type){
    let damage = Math.floor((((2 * level / 5) + 2) * power * (stats[1].base_stat / battleData.enemy.stats[2].base_stat) / 50) + 2);
    let random = Math.floor(Math.random() * 16);
    if(random === 0){
        damage *= 1,5;
    }
    random = Math.floor(Math.random() * 16 + 85) / 100;
    damage *= random;

    /*
    if(battleData.player.type === playerPkmn[4 - battleData.player.pkmn].move[0].type.name){
        damage *= 1,5;
    }*/

    return Math.floor(damage);
}

export async function updateLife(playerDamage, enemyDamage, p = -1){
    if(battleData.player.stats[5].base_stat > battleData.enemy.stats[5].base_stat || p == 0){
        battleData.enemy.life -= playerDamage;
        if(battleData.enemy.life <= 0){
            diedPkmn(1);
        }
        else{
            battleData.player.life -= enemyDamage;
            if(battleData.player.life <= 0){
                diedPkmn(0);
            }
            else{
                updateLifeBar();
            }
        }
    }
    else if(battleData.player.stats[5].base_stat < battleData.enemy.stats[5].base_stat || p == 1){
        battleData.player.life -= enemyDamage;
        if(battleData.player.life <= 0){
            diedPkmn(0);
        }
        else{
            battleData.enemy.life -= playerDamage;
            if(battleData.enemy.life <= 0){
                diedPkmn(1);
            }
            else{
                updateLifeBar();
            }
        }
    }
    else{
        let random = Math.floor(Math.random() * 2);
        updateLife(playerDamage, enemyDamage, random);
    }
}

function diedPkmn(index){
    lifeBar[index].children[1].children[0].style.width = '0%';
    lifeBar[index].children[0].children[0].innerHTML = 'HP ' + 0 + '/' + battleData.player.lifeMax;

    if(index == 0){
        battleData.player.pkmn--;
        if(battleData.player.pkmn == 0) endGame(false);
        else{
            initStats(true, false);
            initMoves(4 - battleData.player.pkmn);
        }

    }
    else{
        battleData.enemy.pkmn--;
        if(battleData.enemy.pkmn == 0) endGame(true);
        else initStats(false, true);
    }
    if(battleData.player.pkmn > 0 && battleData.enemy.pkmn > 0){
        updatePkmnUI(4 - battleData.player.pkmn, 4 - battleData.enemy.pkmn);
    }

}

function updateLifeBar(){

    lifeBar[0].children[0].children[0].innerHTML = 'HP ' + battleData.player.life + '/' + battleData.player.lifeMax;
    lifeBar[0].children[1].children[0].style.width = (battleData.player.life / battleData.player.lifeMax) * 100 + '%';

    lifeBar[1].children[0].children[0].innerHTML = 'HP ' + battleData.enemy.life + '/' + battleData.enemy.lifeMax;
    lifeBar[1].children[1].children[0].style.width = (battleData.enemy.life / battleData.enemy.lifeMax) * 100 + '%';
}