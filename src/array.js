// Functions courtesy of https://www.geeksforgeeks.org/find-all-adjacent-elements-of-given-element-in-a-2d-array-or-matrix/

function isValidPos(i, j, n, m) {
  if (i < 0 || j < 0 || i > n - 1 || j > m - 1) return 0;
  return 1;
}

// Function that returns all adjacent elements
export function getAdjacent(arr, i, j) {
  // Size of given 2d array
  const n = arr.length;
  const m = arr[0].length;

  // Initialising a vector array
  // where adjacent element will be stored
  const v = [];

  // Checking for all the possible adjacent positions
  if (isValidPos(i - 1, j - 1, n, m)) v.push(arr[i - 1][j - 1]);
  if (isValidPos(i - 1, j, n, m)) v.push(arr[i - 1][j]);
  if (isValidPos(i - 1, j + 1, n, m)) v.push(arr[i - 1][j + 1]);
  if (isValidPos(i, j - 1, n, m)) v.push(arr[i][j - 1]);
  if (isValidPos(i, j + 1, n, m)) v.push(arr[i][j + 1]);
  if (isValidPos(i + 1, j - 1, n, m)) v.push(arr[i + 1][j - 1]);
  if (isValidPos(i + 1, j, n, m)) v.push(arr[i + 1][j]);
  if (isValidPos(i + 1, j + 1, n, m)) v.push(arr[i + 1][j + 1]);

  // Returning the vector
  return v;
}

export function hasAdjacentShip(board, x, y) {
  const adjacentCoords = getAdjacent(board, x, y);
  let nonShip = 0;
  adjacentCoords.forEach(coord => {
    if (coord === 0) {
      nonShip++;
    }
  });
  // This means there is at least one ship on the surrounding tiles
  if (nonShip !== adjacentCoords.length) {
    return true;
  }
  return false;
}
