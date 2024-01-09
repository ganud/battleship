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
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j] !== 0) {
          sum = this.board[i][j].hits + sum;
        }
      }
    }
    if (sum === 20) {
      return true;
    }

    return false;
  }

  renderBoard(gameboard) {
    for (let i = 0; i < 10; i++)  {
      let line = document.createElement('div');
      line.classList.add('line');
      for (let j = 0; j < 10; j++) {
        let square = document.createElement('div');
        square.classList.add('square');
        line.appendChild(square);
      }
      gameboard.appendChild(line);
    }
  }
}
