import { playerPkmn, enemyPkmn} from "../draft.js";
const lifeBar = document.getElementsByClassName('lifeBar');
const level = 100;

export let battleData = {
    'player': {
        'lifeMax': 0,
        'life': 0,
        'pkmn': 4,
        'stats': {},
        'type': '',
    },
    'enemy': {
        'lifeMax': 0,
        'life': 0,
        'pkmn': 4,
        'stats': {},
        'type' : '',
    }
}

export function initStats() {
    lifeBar[0].children[1].children[0].classList.remove('w-full');
    lifeBar[0].children[1].children[0].style.width = '100%';
    lifeBar[0].children[1].children[0].classList.remove('w-full');
    lifeBar[1].children[1].children[0].style.width = '100%';
    fetch(`https://pokeapi.co/api/v2/pokemon/${playerPkmn[4 - battleData.player.pkmn].name}`).then(
        (response) => {
            return response.json();
        }
    ).then((data) => {
        battleData.player.stats = data.stats;
        battleData.player.type = data.types[0].type.name;
        battleData.player.lifeMax = Math.floor((battleData.player.stats[0].base_stat * 2 * level / 100) + level + 10);
        battleData.player.life = battleData.player.lifeMax;
        lifeBar[0].children[0].innerHTML = 'HP ' + battleData.player.life + '/' + battleData.player.lifeMax;
    });
    fetch(`https://pokeapi.co/api/v2/pokemon/${enemyPkmn[4 - battleData.enemy.pkmn].name}`).then(
        (response) => {
            return response.json();
        }
    ).then((data) => {
        battleData.enemy.stats = data.stats;
        battleData.enemy.type = data.types[0].type.name;
        battleData.enemy.lifeMax = Math.floor((battleData.enemy.stats[0].base_stat * 2 * level / 100) + level + 10);
        battleData.enemy.life = battleData.enemy.lifeMax;
        lifeBar[1].children[0].innerHTML = 'HP ' + battleData.enemy.life + '/' + battleData.enemy.lifeMax;
    });
}

/*
export function damageCalculation(playerMove, enemyMove) {
    playerMove = playerPkmn[4 - battleData.player.pkmn].move[playerMove];
    enemyMove = enemyPkmn[4 - battleData.enemy.pkmn].move[enemyMove];
    getMoveData(playerMove, enemyMove).then((moves) => {
        playerMove = moves[0];
        enemyMove = moves[1];

        battleData.player.life -= getDamage(playerMove.power, battleData.enemy.stats, playerMove.type.name);
        battleData.enemy.life -= getDamage(enemyMove.power, battleData.player.stats, );
        updateLifeBar();
    });
}*/

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

export async function updateLife(playerDamage, enemyDamage){
    battleData.player.life -= enemyDamage;
    battleData.enemy.life -= playerDamage;

    lifeBar[0].children[0].innerHTML = 'HP ' + battleData.player.life + '/' + battleData.player.lifeMax;
    lifeBar[0].children[1].children[0].style.width = (battleData.player.life / battleData.player.lifeMax) * 100 + '%';

    lifeBar[1].children[0].innerHTML = 'HP ' + battleData.enemy.life + '/' + battleData.enemy.lifeMax;
    lifeBar[1].children[1].children[0].style.width = (battleData.enemy.life / battleData.enemy.lifeMax) * 100 + '%';

}

