import './style.css';
import { Player } from './player'
import { Gameboard } from './gameboard';
import { renderBoard } from './dom';
import { Ship } from './ship';

const enemyBoard = document.getElementsByClassName('enemy-gameboard')[0];
const enemyGameboard = new Gameboard();
renderBoard(enemyBoard, enemyGameboard, false);

const playerBoard = document.getElementsByClassName('player-gameboard')[0];
const playerGameboard = new Gameboard();
renderBoard(playerBoard, playerGameboard, true);

const player = new Player(enemyGameboard, enemyBoard);
const enemy = new Player(playerGameboard, playerBoard);


// Game loop
// Before rendering
// Get player move(click)
// Get ai move
