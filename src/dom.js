/* eslint-disable import/prefer-default-export */
import { Player } from './player';
import { Gameboard } from './gameboard';
import { Ship } from './ship';

export function renderBoard(boardDom, boardObject) {
  boardDom.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    for (let j = 0; j < 10; j++) {
      const square = document.createElement('div');
      square.classList.add('square');
      // If tile already attacked render it red
      if (boardObject.fired.includes(`[${i},${j}]`)) {
        square.classList.add('hit');
      }
      if (boardObject.isShip(i, j)) {
        square.classList.add('ship');
      }
      // Adjust tile behaviour here
      square.setAttribute('value', `[${i},${j}]`);
      square.addEventListener('click', () => {
        boardObject.receiveAttack(i, j);
        renderBoard(boardDom, boardObject);
      });
      line.appendChild(square);
    }
    boardDom.appendChild(line);
  }
};