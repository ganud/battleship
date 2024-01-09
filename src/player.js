/* eslint-disable import/prefer-default-export */
// Take enemy gameboard
import { Gameboard } from './gameboard';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export class Player {
  enemyGameboard = null;

  constructor(enemyGameboard) {
    this.enemyGameboard = enemyGameboard;
  }

  randomMove() {
    while (true) {
      const x = getRandomInt(10); // 0 to 9
      const y = getRandomInt(10);
      // Check if moves already in fired
      if (this.enemyGameboard.fired.includes(`[${x},${y}]`)) {
        continue;
      }
      this.enemyGameboard.receiveAttack(x, y);
      break;
    }
  }

  // If tile is shot, add adjacent tiles to a queue?
}
