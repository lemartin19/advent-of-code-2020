
const { INPUT } = require('./day11-input');
const { arrayEquals } = require('./utils');

const FLOOR = '.';
const EMPTY = 'L';
const OCCUPIED = '#';


const countOccupied = layout => 
  layout.reduce((count, row) => 
    row.reduce((acc, seat) => 
      seat === OCCUPIED ? acc + 1 : acc, count
    ), 0);

const countOccupiedNeighborsPt1 = (layout, rowIdx, colIdx) => {
  let occupied = 0;
  for (let i = rowIdx - 1; i <= rowIdx + 1; i++) {
    for (let j = colIdx - 1; j <= colIdx + 1; j++) {
      if ((i === rowIdx && j === colIdx) || !layout[i]) continue;
      if (layout[i][j] === OCCUPIED) occupied++;
    }
  }
  return occupied;
};

const firstInDirIsOccupied = (layout, rdiff, cdiff, row, col) => {
  let nextRow = row + rdiff;
  let nextCol = col + cdiff;
  if (!layout[nextRow] || layout[nextRow][nextCol] !== FLOOR)
    return layout[nextRow] && layout[nextRow][nextCol] === OCCUPIED;
  return firstInDirIsOccupied(layout, rdiff, cdiff, nextRow, nextCol)
};

const countOccupiedNeighborsPt2 = (layout, rowIdx, colIdx) => {
  let occupied = 0;
  for (let rdiff = -1; rdiff <= 1; rdiff++) {
    for (let cdiff = -1; cdiff <= 1; cdiff++) {
      if (rdiff === 0 && cdiff === 0) continue;
      occupied += firstInDirIsOccupied(layout, rdiff, cdiff, rowIdx, colIdx) ? 1 : 0;
    }
  }
  return occupied;
};

const advanceState = (layout, countFn, maxVisible) => 
  layout.map((row, rowIdx) => 
    row.map((seat, colIdx) => {
      if (seat === FLOOR) return FLOOR;

      const neighbors = countFn(layout, rowIdx, colIdx);
      if (neighbors === 0) return OCCUPIED;
      if (neighbors >= maxVisible) return EMPTY;
      return seat;
  }));

const findEnd = (layout, countFn, maxVisible) => {
  const next = advanceState(layout, countFn, maxVisible);
  const nextIsSame = layout.every((row, idx) => arrayEquals(next[idx], row));
  if (nextIsSame) return next;
  return findEnd(next, countFn, maxVisible);
};

const finalLayout = findEnd(INPUT, countOccupiedNeighborsPt1, 4);
const occupiedSeats = countOccupied(finalLayout);
const finalLayout2 = findEnd(INPUT, countOccupiedNeighborsPt2, 5);
const occupiedSeats2 = countOccupied(finalLayout2);
console.log(`result pt 1: ${occupiedSeats}`);
console.log(`result pt 2: ${occupiedSeats2}`);