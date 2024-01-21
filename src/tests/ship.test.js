import { Ship } from '../ship';

test('Hit', () => {
  const Carrier = new Ship(5);
  Carrier.hit();
  expect(Carrier.hits).toBe(1);
});

test('Not Sunk Below 5 hits', () => {
  const Carrier = new Ship(5);
  Carrier.hit();
  expect(Carrier.isSunk()).toBeFalsy();
});

test('Sunk after 5 hits', () => {
  const Carrier = new Ship(5);
  for (let i = 0; i < 5; i++) {
    Carrier.hit();
  }
  expect(Carrier.isSunk()).toBeTruthy();
});
