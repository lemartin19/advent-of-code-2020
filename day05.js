
const { INPUT } = require('./day5-input');

const ROW_DIGITS = 7;
const COL_DIGITS = 3;

const binarySpacePartitioning = (seat, min, max) => {
  if (min === max) return min;

  let newMin = min;
  let newMax = max;

  const first = seat.substring(0, 1);
  if (first === 'F' || first === 'L') {
    newMax = min + Math.floor((max - min) / 2)
  }
  else {
    newMin = max - Math.floor((max - min) / 2)
  }

  return binarySpacePartitioning(seat.slice(1), newMin, newMax);
}

const calculateSeatId = seat => {
  const row = binarySpacePartitioning(seat, 0, 2 ** ROW_DIGITS - 1);
  const col = binarySpacePartitioning(seat.slice(ROW_DIGITS), 0, 2 ** COL_DIGITS - 1);
  return row * 8 + col;
};

const findSeat = seats => {
  const sorted = seats.sort((a, b) => a - b);

  let mySeat = 0;
  sorted.reduce((seat, curr) => {
    if (seat + 1 !== curr) mySeat = seat + 1;
    return curr;
  })
  return mySeat;
}

const allSeats = INPUT.map(calculateSeatId);
const max = allSeats.reduce((maxSoFar, curr) => maxSoFar < curr ? curr : maxSoFar);
const mySeat = findSeat(allSeats);
console.log(`result pt 1: ${max}`);
console.log(`result pt 2: ${mySeat}`)