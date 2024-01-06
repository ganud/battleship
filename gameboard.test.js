import {Gameboard} from "./gameboard";
import {Ship} from "./ship";


test('Gameboard registers hit', () => {
  let gameboard = new Gameboard();
  gameboard.board[9][9] = new Ship(5);
  gameboard.receiveAttack(9,9);
  expect(gameboard.board[9][9].hits).toBe(1);
});

test('Gameboard recognizes already fired tile', () => {
  let gameboard = new Gameboard();
  gameboard.board[9][9] = new Ship(5);
  gameboard.receiveAttack(9,9);
  expect(gameboard.receiveAttack(9,9)).toBe(undefined);
});

test('Gameboard records a missed shot', () => {
  let gameboard = new Gameboard();
  gameboard.receiveAttack(0,0);
  expect(gameboard.missed).toEqual(['[0,0]']);
});

test('Gameboard successfully checks for a loss', () => {
  let gameboard = new Gameboard();

  gameboard.board[6][9] = new Ship(19); // To check for a loss, the board needs to sum up the hits
  gameboard.board[6][8] = new Ship(1); // Length used as a simplification
  expect(gameboard.checkSunk()).toBeTruthy();
});

test('Adjacent named ships register the same hits', () => {
  let gameboard = new Gameboard();
  let Carrier = new Ship(5);
  gameboard.board[7][7] = Carrier;
  gameboard.board[7][8] = Carrier;
  gameboard.receiveAttack(7,8);
  gameboard.receiveAttack(7,7);
  expect(gameboard.board[7][7].hits).toBe(2);
});