
const { INPUT } = require('./day1-input');

const findInRest = (searchVal, start, end, arr) => {
  if (start >= end - 1) return null;

  const middle = Math.floor((start + end) / 2);
  if (searchVal === arr[middle]) return middle;
  if (searchVal < arr[middle]) return findInRest(searchVal, start, middle, arr);
  return findInRest(searchVal, middle, end, arr);
}

const findAnyNumberOfSums = (numSums, sortedInput, start, sum) => {
  if (numSums === 1) 
    return findInRest(sum, start, sortedInput.length, sortedInput) ? [sum] : null;

  let smallest;
  for (var i = start; i <= sortedInput.length; i++) {
    smallest = sortedInput[i];

    const findArr = findAnyNumberOfSums(numSums - 1, sortedInput, start, sum - smallest);
    if (findArr) return [smallest, ...findArr];
  }

  return null;
}


const SORTED = INPUT.sort((a, b) => a - b);
const [smaller, larger] = findAnyNumberOfSums(2, SORTED, 0, 2020);
const result = findAnyNumberOfSums(3, SORTED, 0, 2020);
console.log(`result pt 1: ${smaller ? smaller * larger : null}`);
console.log(`result pt 2: ${result.reduce((acc, num) => acc * num)}`);