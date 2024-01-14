import { forEach, uniq } from 'lodash';
import { Ship } from './ship';
/* eslint-disable import/prefer-default-export */
export class Gameboard {
  // should be a 2d array
  fired = []; // Records already fired tiles

  missed = [];

  board = [];

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.board.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
  }

  receiveAttack(x, y) {
    // Case 1: Check if coord already shot
    if (this.fired.includes(`[${x},${y}]`)) {
      return null;
    }
    // Case 2: Check if coord is a ship and record hit
    if (this.board[x][y] !== 0) {
      this.board[x][y].hit();
    } else {
      this.missed.push(`[${x},${y}]`);
    }
    this.fired.push(`[${x},${y}]`);
  }

  checkSunk() {
    // Should record total hits needed to down an entire board (20)
    let sum = 0;
    const ships = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j] !== 0) {
          ships.push(this.board[i][j]);
        }
      }
    }
    const uniqueShips = uniq(ships);
    uniqueShips.forEach((ship) => sum += ship.hits);
    if (sum === 20) {
      return true;
    }

    return false;
  }

  placeShip(x, y, ship) {
    // Out of bounds or a ship
    if (x < 0 || x > 9 || y < 0 || y > 9 || this.board[x][y] !== 0) {
      return null;
    }
    this.board[x][y] = ship;
  }

  isShip(x, y) {
    if (this.board[x][y] !== 0) {
      return true;
    }
    return false;
  }
}
