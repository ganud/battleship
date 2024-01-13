/* eslint-disable import/prefer-default-export */
import { Player } from './player';
import { Gameboard } from './gameboard';
import { Ship } from './ship';

export function renderBoard(player, isPlayer=false) {
  player.enemyDOM.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    for (let j = 0; j < 10; j++) {
      const square = document.createElement('div');
      square.classList.add('square');
      // If tile already attacked render it red
      if (player.enemyGameboard.fired.includes(`[${i},${j}]`)) {
        square.classList.add('hit');
      }
      if (player.enemyGameboard.isShip(i, j)) {
        square.classList.add('ship');
      }
      square.setAttribute('value', `[${i},${j}]`);
      // Only allow enemy tiles to be clicked on
      if (!isPlayer) {
        // Adjust tile behaviour here
        square.addEventListener('click', () => {
          advanceTurn(humanplayer, enemyplayer, i, j)
        });
      }
      line.appendChild(square);
    }
    player.enemyDOM.appendChild(line);
  }
};

export function advanceTurn(player, enemy, x, y) {
  player.attack(x,y);
  enemy.randomMove();
  renderBoard(player, false);
  renderBoard(enemy, true);
}

const enemyBoard = document.getElementsByClassName('enemy-gameboard')[0];
const enemyGameboard = new Gameboard();

const playerBoard = document.getElementsByClassName('player-gameboard')[0];
const playerGameboard = new Gameboard();

const humanplayer = new Player(enemyGameboard, enemyBoard);
const enemyplayer = new Player(playerGameboard, playerBoard);