/* eslint-disable import/prefer-default-export */
import { Player, getRandomInt } from './player';
import { Gameboard } from './gameboard';
import { Ship } from './ship';

export function renderBoard(player, isPlayer = false, gameOver = false) {
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
      // Render ships for players only
      if (player.enemyGameboard.isShip(i, j) && isPlayer === true) {
        square.classList.add('ship');
      }
      // Render ships for enemies IF hit
      if (player.enemyGameboard.isShip(i, j) && square.classList.contains('hit')) {
        square.classList.add('ship');
      }
      square.setAttribute('value', `[${i},${j}]`);
      // Disallow clicking on enemyboard or when game is ended
      if (!isPlayer && !gameOver) {
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
  if (player.enemyGameboard.checkSunk() || enemy.enemyGameboard.checkSunk()) {
    renderBoard(player, false, true);
    renderBoard(enemy, true, true);
    return;
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
    for (let i = 0; i < ship.length; i++) {
      if (player.enemyGameboard.placeShip(i + x, y, ship) !== null) {
        successCount++;
        placed.push(`[${i + x},${y}]`);
      }
    }
  } else if (mode === 'vertical') {
    for (let i = 0; i < ship.length; i++) {
      if (player.enemyGameboard.placeShip(x, y + i, ship) !== null) {
        successCount++;
        placed.push(`[${x},${y + i}]`);
      }
    }
  }
  // Reverse gameboard changes if unsuccessful
  if (successCount !== ship.length) {
    placed.forEach((coord) => {
      const xcoord = coord.charAt(1);
      const ycoord = coord.charAt(3);
      player.enemyGameboard.board[xcoord][ycoord] = 0;
    });
    return null;
  }
}

export function placeRandomShips(player) {
  const shipLengths = [5, 4, 3, 3, 2, 2, 1];
  shipLengths.forEach((length) => {
    const ship = new Ship(length);
    // choose random coords

    while (true) {
      const x = getRandomInt(10);
      const y = getRandomInt(10);
      if (placeShipOfLength(player, ship, x, y, 'horizontal') !== null) {
        break;
      }
    }
  });
}
const enemyBoard = document.getElementsByClassName('enemy-gameboard')[0];
const enemyGameboard = new Gameboard();

const playerBoard = document.getElementsByClassName('player-gameboard')[0];
const playerGameboard = new Gameboard();

const humanplayer = new Player(enemyGameboard, enemyBoard);
const enemyplayer = new Player(playerGameboard, playerBoard);

placeRandomShips(enemyplayer);
