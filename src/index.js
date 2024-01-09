import './style.css';
import { Player } from './player'
import { Gameboard } from './gameboard';

const enemyBoard = document.getElementsByClassName('enemy-gameboard')[0];
const enemyGameboard = new Gameboard();
enemyGameboard.renderBoard(enemyBoard);

const playerBoard = document.getElementsByClassName('player-gameboard')[0];
const playerGameboard = new Gameboard();
playerGameboard.renderBoard(playerBoard);