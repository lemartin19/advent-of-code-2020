
const { INPUT } = require('./day3-input.js');

const countNumTrees = (input, xdiff, ydiff) => {
  const xmax = input[0].length;
  const ymax = input.length;

  let currx = 0;
  let curry = 0;
  let count = 0;

  while (curry < ymax) {
    count += input[curry][currx] === '#' ? 1 : 0;

    currx = (xdiff + currx) % xmax;
    curry += ydiff;
  }
  return count;
};

const numTrees = countNumTrees(INPUT, 3, 1);
const allSlopes = [countNumTrees(INPUT, 1, 1), countNumTrees(INPUT, 3, 1), countNumTrees(INPUT, 5, 1), countNumTrees(INPUT, 7, 1), countNumTrees(INPUT, 1, 2)];
console.log(`result pt 1: ${numTrees}`);
console.log(`result pt 2: ${allSlopes.reduce((acc, num) => acc * num)}`);
