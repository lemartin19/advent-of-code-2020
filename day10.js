
const { INPUT } = require('./day10-input');
const { buildArr } = require('./utils');

const DIFF = 3;

const findDistribution = input => {
  const diffs = buildArr(DIFF + 1, 0);

  sortedWithBuiltIn.reduce((previous, current) => {
    diffs[current - previous]++;
    return current;
  })
  return diffs;
}

const countArrangements = (input) => {
  if (input.length <= 2) return 1;

  const first = input[0];
  const rest = input.slice(1);
  return rest.reduce((acc, newFirst, idx) => 
    newFirst - first <= DIFF ? acc + countArrangements(rest.slice(idx)) : acc,
  0)
};

const sorted = INPUT.sort((a, b) => a - b);
const builtIn = sorted[sorted.length - 1] + 3;
const sortedWithBuiltIn = [0, ...sorted, builtIn];
const diffs = findDistribution(sortedWithBuiltIn);
const count = countArrangements(sortedWithBuiltIn);
console.log(`result pt 1: ${diffs[1] * diffs[3]}`);
console.log(`result pt 2: ${count}`);