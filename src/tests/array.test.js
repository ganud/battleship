import { getAdjacent, hasAdjacentShip } from '../array';
import { Gameboard } from '../gameboard';
import { Ship } from '../ship';


test('Adjacent ship true', () => {
  const gameboard = new Gameboard();
  gameboard.board[1][0] = new Ship(5);
  expect(hasAdjacentShip(gameboard.board, 0, 0)).toBe(true);
});

test('Adjacent ship false', () => {
  const gameboard = new Gameboard();
  expect(hasAdjacentShip(gameboard.board, 0, 0)).toBe(false);
});

test('Adjacent ship true', () => {
  const gameboard = new Gameboard();
  gameboard.board[4][5] = new Ship(5);
  expect(hasAdjacentShip(gameboard.board, 5, 5)).toBe(true);
});