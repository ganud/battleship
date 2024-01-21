import { Gameboard } from '../gameboard';
import { Ship } from '../ship';
import { Player } from '../player';

test('Fires at a random coord', () => {
  const gameboard = new Gameboard();
  const player = new Player(gameboard);
  player.randomMove();
  expect(gameboard.fired).not.toHaveLength(0);
});