import {Gameboard} from "./gameboard";
import {Ship} from "./ship";

let gameboard = new Gameboard();

test('Gameboard registers hit', () => {
  gameboard.board[9][9] = new Ship(5);
  gameboard.receiveAttack(9,9);
  expect(gameboard.board[9][9].hits).toBe(1);
});

test('Gameboard recognizes already fired tile', () => {
  expect(gameboard.receiveAttack(9,9)).toBe(undefined);
});

test('Gameboard records a missed shot', () => {
  gameboard.receiveAttack(0,0);
  expect(gameboard.missed).toEqual(['[0,0]']);
});

test('Gameboard successfully checks for a loss', () => {
  let Lgameboard = new Gameboard();

  Lgameboard.board[6][9] = new Ship(19); // To check for a loss, the board needs to sum up the hits
  Lgameboard.board[6][8] = new Ship(1); // Length used as a simplification
  expect(Lgameboard.checkSunk()).toBeTruthy();
});

test('Adjacent named ships register the same hits', () => {
  let Carrier = new Ship(5);
  gameboard.board[7][7] = Carrier;
  gameboard.board[7][8] = Carrier;
  gameboard.receiveAttack(7,8);
  gameboard.receiveAttack(7,7);
  expect(gameboard.board[7][7].hits).toBe(2);
});