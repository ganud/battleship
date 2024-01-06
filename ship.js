/* eslint-disable import/prefer-default-export */
export class Ship {
  constructor(length) {
    this.length = length;
  }

  length = null;

  hits = 0;

  hit() {
    this.hits++;
  }

  isSunk() {
    if (this.hits >= this.length) {
      return true;
    }
  }
}
