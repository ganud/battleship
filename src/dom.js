/* eslint-disable import/prefer-default-export */
import { Player } from './player';
import { Gameboard } from './gameboard';
import { Ship } from './ship';

export function renderBoard(player, isPlayer = false) {
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
          advanceTurn(humanplayer, enemyplayer, i, j);
        });
      }
      line.appendChild(square);
    }
    player.enemyDOM.appendChild(line);
  }
}

export function advanceTurn(player, enemy, x, y) {
  if (player.attack(x, y) !== 'already hit') {
    enemy.randomMove();
  }
  renderBoard(player, false);
  renderBoard(enemy, true);
}

export function placeShipOfLength(player, ship, x, y, mode = 'horizontal') {
// Limit all placements to a row or column, and they MUST be adjacent
// If the condition can't be met, undo the placement
// Placeship will check out of bounds, or if a ship is on that tile
// Perhaps also check adjacent tiles?
  let successCount = 0;
  const placed = [];
  if (mode === 'horizontal') {
    for (let i = x; i < ship.length; i++) {
      if (player.enemyGameboard.placeShip(i, y, ship) !== null) {
        successCount++;
        placed.push(`[${i},${y}]`);
      }
    }
  }
  // Reverse gameboard changes if unsuccessful
  if (successCount !== ship.length) {
    placed.forEach(coord => {
      let xcoord = coord.charAt(1);
      let ycoord = coord.charAt(3);
      player.enemyGameboard[xcoord][ycoord] = 0;
    });
  }
}
const enemyBoard = document.getElementsByClassName('enemy-gameboard')[0];
const enemyGameboard = new Gameboard();

const playerBoard = document.getElementsByClassName('player-gameboard')[0];
const playerGameboard = new Gameboard();

const humanplayer = new Player(enemyGameboard, enemyBoard);
const enemyplayer = new Player(playerGameboard, playerBoard);
placeShipOfLength(enemyplayer, new Ship(5), 0, 0);
