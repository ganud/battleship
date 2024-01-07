import { Gameboard } from './gameboard';
import { Ship } from './ship';

test('Gameboard registers hit', () => {
  const gameboard = new Gameboard();
  gameboard.board[9][9] = new Ship(5);
  gameboard.receiveAttack(9, 9);
  expect(gameboard.board[9][9].hits).toBe(1);
});

test('Gameboard recognizes already fired tile', () => {
  const gameboard = new Gameboard();
  gameboard.board[9][9] = new Ship(5);
  gameboard.receiveAttack(9, 9);
  expect(gameboard.receiveAttack(9, 9)).toBe(null);
});

test('Gameboard records a missed shot', () => {
  const gameboard = new Gameboard();
  gameboard.receiveAttack(0, 0);
  expect(gameboard.missed).toEqual(['[0,0]']);
});

test('Gameboard successfully checks for a loss', () => {
  const gameboard = new Gameboard();
  gameboard.board[6][9] = new Ship(19); // To check for a loss, the board needs to sum up the hits
  gameboard.board[6][8] = new Ship(1); // There are 20 hits in a traditional battleship game
  gameboard.board[6][9].hits = 19;
  gameboard.board[6][8].hits = 1;
  expect(gameboard.checkSunk()).toBeTruthy();
});

test('Adjacent named ships register the same hits', () => {
  const gameboard = new Gameboard();
  const Carrier = new Ship(5);
  gameboard.board[7][7] = Carrier;
  gameboard.board[7][8] = Carrier;
  gameboard.receiveAttack(7, 8);
  gameboard.receiveAttack(7, 7);
  expect(gameboard.board[7][7].hits).toBe(2);
});
