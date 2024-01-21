/* eslint-disable no-loop-func */
/* eslint-disable import/prefer-default-export */
import { Player, getRandomInt } from './player';
import { Gameboard } from './gameboard';
import { Ship } from './ship';
import { hasAdjacentShip } from './array';

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

// Returns null if unsuccessful
export function placeShipOfLength(player, ship, x, y, mode = 'horizontal') {
  let successCount = 0;
  const placed = [];
  if (mode === 'horizontal') {
    // Check if there are any adjacent ships beforehand
    for (let i = 0; i < ship.length; i++) {
      if (hasAdjacentShip(player.enemyGameboard.board, i + x, y) === true) {
        return null;
      }
    }
    for (let i = 0; i < ship.length; i++) {
      // Only push valid ship placements
      if (player.enemyGameboard.placeShip(i + x, y, ship) !== null) {
        successCount++;
        placed.push(`[${i + x},${y}]`);
      }
    }
  } else if (mode === 'vertical') {
    for (let i = 0; i < ship.length; i++) {
      if (hasAdjacentShip(player.enemyGameboard.board, x, y + i) === true) {
        return null;
      }
    }
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
      let mode = '';
      if (getRandomInt(2) === 1) {
        mode = 'vertical';
      } else {
        mode = 'horizontal';
      }
      if (placeShipOfLength(player, ship, x, y, mode) !== null) {
        break;
      }
    }
  });
}

// Variant of renderboard for the player
export function selectrenderBoard(player, shipLengthsindex = 0) {
  const shipLengths = [5, 4, 3, 3, 2, 2, 1];
  player.enemyDOM.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    for (let j = 0; j < 10; j++) {
      const square = document.createElement('div');
      square.classList.add('square');
      // Render ships for players only
      if (player.enemyGameboard.isShip(i, j)) {
        square.classList.add('ship');
      }
      square.setAttribute('value', `[${i},${j}]`);
      // Adjust tile behaviour here
      square.addEventListener('click', () => {
        if (placeShipOfLength(player, new Ship(shipLengths[shipLengthsindex]), i, j, playerOrientation) !== null) {
          shipLengthsindex++;
          // Start the game once all ships are placed
          if (shipLengthsindex >= shipLengths.length) {
            renderBoard(enemyplayer, false);
            renderBoard(humanplayer, false);
          }
          selectrenderBoard(player, shipLengthsindex);
        }
      });
      line.appendChild(square);
    }
    player.enemyDOM.appendChild(line);
  }
}

let playerOrientation = 'horizontal';
window.addEventListener('keydown', (event) => {
  // Adjust placement direction on q press
  if (event.key === 'q') {
    if (playerOrientation === 'horizontal') {
      playerOrientation = 'vertical';
    } else {
      playerOrientation = 'horizontal';
    }
  }
});

const enemyBoard = document.getElementsByClassName('enemy-gameboard')[0];
const enemyGameboard = new Gameboard();

const playerBoard = document.getElementsByClassName('player-gameboard')[0];
const playerGameboard = new Gameboard();

const humanplayer = new Player(enemyGameboard, enemyBoard);
const enemyplayer = new Player(playerGameboard, playerBoard);

placeRandomShips(humanplayer);

selectrenderBoard(enemyplayer);
