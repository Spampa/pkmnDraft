import { playerPkmn, enemyPkmn } from "../draft.js";
import { initStats } from "./statsFunction.js";

const moves = document.getElementById('moves');
const preGame = document.getElementById('preGame');
const game = document.getElementById('game');

export function initAllPkmnData() {
    initStats();

    initMoves().then(() => {
        preGame.classList.add('hidden');
        game.classList.remove('hidden');
        game.classList.add('grid');
    });
}

export async function initMoves(index = 0) {
    for (let i = 0; i < 4; i++) {
        fetch('https://pokeapi.co/api/v2/move/' + playerPkmn[index].move[i].id).then
            (response => response.json()).then(data => {
                setMoveColor(moves.children[i], data.type.name);
                moves.children[i].innerHTML = playerPkmn[index].move[i].name;
            });
    }
}

function setMoveColor(move, type) {
    //change background color of move
    switch (type) {
        case 'normal':
            move.style.backgroundColor = '#A8A77A';
            move.addEventListener('mouseleave', () => {
                move.style.backgroundColor = '#A8A77A';
            });
            move.addEventListener('mouseover', () => {
                move.style.backgroundColor = '#C6C6A7';
            });
            break;
        case 'fire':
            move.style.backgroundColor = '#EE8130';
            move.addEventListener('mouseleave', () => {
                move.style.backgroundColor = '#EE8130';
            });
            move.addEventListener('mouseover', () => {
                move.style.backgroundColor = '#F5AC78';
            });
            break;
        case 'water':
            move.style.backgroundColor = '#6390F0';
            move.addEventListener('mouseleave', () => {
                move.style.backgroundColor = '#6390F0';
            });
            move.addEventListener('mouseover', () => {
                move.style.backgroundColor = '#9DB7F5';
            });
            break;
        case 'electric':
            move.style.backgroundColor = '#F7D02C';
            move.addEventListener('mouseleave', () => {
                move.style.backgroundColor = '#F7D02C';
            });
            move.addEventListener('mouseover', () => {
                move.style.backgroundColor = '#FAE078';
            });
            break;
        case 'grass':
            move.style.backgroundColor = '#7AC74C';
            move.addEventListener('mouseleave', () => {
                move.style.backgroundColor = '#7AC74C';
            });
            move.addEventListener('mouseover', () => {
                move.style.backgroundColor = '#A7DB8D';
            });
            break;
        case 'ice':
            move.style.backgroundColor = '#96D9D6';
            move.addEventListener('mouseleave', () => {
                move.style.backgroundColor = '#96D9D6';
            });
            move.addEventListener('mouseover', () => {
                move.style.backgroundColor = '#BCE6E6';
            });
            break;
        case 'fighting':
            move.style.backgroundColor = '#C22E28';
            move.addEventListener('mouseleave', () => {
                move.style.backgroundColor = '#C22E28';
            });
            move.addEventListener('mouseover', () => {
                move.style.backgroundColor = '#D67873';
            });
            break;
        case 'poison':
            move.style.backgroundColor = '#A33EA1';
            move.addEventListener('mouseleave', () => {
                move.style.backgroundColor = '#A33EA1';
            });
            move.addEventListener('mouseover', () => {
                move.style.backgroundColor = '#C183C1';
            });
            move.classList.add('text-white')
            break;
        case 'ground':
            move.style.backgroundColor = '#E2BF65';
            move.addEventListener('mouseleave', () => {
                move.style.backgroundColor = '#E2BF65';
            });
            move.addEventListener('mouseover', () => {
                move.style.backgroundColor = '#EBD69D';
            });
            break;
        case 'flying':
            move.style.backgroundColor = '#A98FF3';
            move.addEventListener('mouseleave', () => {
                move.style.backgroundColor = '#A98FF3';
            });
            move.addEventListener('mouseover', () => {
                move.style.backgroundColor = '#C6B7F5';
            });
            break;
        case 'psychic':
            move.style.backgroundColor = '#F95587';
            move.addEventListener('mouseleave', () => {
                move.style.backgroundColor = '#F95587';
            });
            move.addEventListener('mouseover', () => {
                move.style.backgroundColor = '#FA92B2';
            });
            move.classList.add('text-white')
            break;
        case 'bug':
            move.style.backgroundColor = '#A6B91A';
            move.addEventListener('mouseleave', () => {
                move.style.backgroundColor = '#A6B91A';
            });
            move.addEventListener('mouseover', () => {
                move.style.backgroundColor = '#C6D16E';
            });
            break;
        case 'rock':
            move.style.backgroundColor = '#B6A136';
            move.addEventListener('mouseleave', () => {
                move.style.backgroundColor = '#B6A136';
            });
            move.addEventListener('mouseover', () => {
                move.style.backgroundColor = '#D1C17D';
            });
            move.classList.add('text-white')
            break;
        case 'ghost':
            move.style.backgroundColor = '#735797';
            move.addEventListener('mouseleave', () => {
                move.style.backgroundColor = '#735797';
            });
            move.addEventListener('mouseover', () => {
                move.style.backgroundColor = '#A292BC';
            });
            move.classList.add('text-white')
            break;
        case 'dragon':
            move.style.backgroundColor = '#6F35FC';
            move.addEventListener('mouseleave', () => {
                move.style.backgroundColor = '#6F35FC';
            });
            move.addEventListener('mouseover', () => {
                move.style.backgroundColor = '#A7A7F8';
            });
            move.classList.add('text-white')
            break;
        case 'dark':
            move.style.backgroundColor = '#705746';
            move.addEventListener('mouseleave', () => {
                move.style.backgroundColor = '#705746';
            });
            move.addEventListener('mouseover', () => {
                move.style.backgroundColor = '#A29288';
            });
            move.classList.add('text-white')
            break;
        case 'steel':
            move.style.backgroundColor = '#B7B7CE';
            move.addEventListener('mouseleave', () => {
                move.style.backgroundColor = '#B7B7CE';
            });
            move.addEventListener('mouseover', () => {
                move.style.backgroundColor = '#D1D1E0';
            });
            break;
        case 'fairy':
            move.style.backgroundColor = '#D685AD';
            move.addEventListener('mouseleave', () => {
                move.style.backgroundColor = '#D685AD';
            });
            move.addEventListener('mouseover', () => {
                move.style.backgroundColor = '#F4BDC9';
            });
            break;
    }
}