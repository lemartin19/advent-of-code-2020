
const { INPUT } = require('./day9-input');
const RANGE = 25;

const hasSumInRange = (num, arr, first, last) => {
  for (let idx = first; idx < last; idx++) {
    for (let otherIdx = idx + 1; otherIdx <= last; otherIdx++) {
      if (num === arr[idx] + arr[otherIdx]) return true;
    }
  }
  return false;
};

const findInvalidXmas = (input, range) => {
  let start = range;

  while (hasSumInRange(input[start], input, start - range, start - 1)) {
    start++;
  }
  return input[start];
};

const rangeOfSums = (arr, findNum) => {
  for (let idx = 0; idx < arr.length; idx++) {
    let diff = 0;
    let currSum = 0;
    while (currSum < findNum) {
      currSum += arr[idx + diff];
      diff++;
    }
    if (currSum === findNum) return arr.slice(idx, idx + diff);
  }
};

const invalid = findInvalidXmas(INPUT, RANGE);
const range = rangeOfSums(INPUT, invalid);
const min = range.reduce((minSoFar, num) => num < minSoFar ? num : minSoFar);
const max = range.reduce((maxSoFar, num) => num > maxSoFar ? num : maxSoFar);
console.log(`result pt 1: ${invalid}`);
console.log(`result pt 2: ${min + max}`);