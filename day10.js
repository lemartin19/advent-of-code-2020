
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

const countArrangements = input => {
  const cache = {};

  const countArrangementsCached = idx => {
    if (input.length - idx < 2) return 1;
    if (cache[idx]) return cache[idx];
  
    const first = input[idx];
    let sum = 0;
    let nextIdx = idx + 1;
    
    while (input[nextIdx] - first <= DIFF) {
      sum += countArrangementsCached(nextIdx);
      nextIdx++;
    }
    cache[idx] = sum;
    return sum;
  };
  
  return countArrangementsCached(0);
};

const sorted = INPUT.sort((a, b) => a - b);
const builtIn = sorted[sorted.length - 1] + 3;
const sortedWithBuiltIn = [0, ...sorted, builtIn];
const diffs = findDistribution(sortedWithBuiltIn);
const count = countArrangements(sortedWithBuiltIn);
console.log(`result pt 1: ${diffs[1] * diffs[3]}`);
console.log(`result pt 2: ${count}`);