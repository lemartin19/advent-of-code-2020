
const buildArr = (size, val = 0) => {
  const arr = [];
  for (let idx = 0; idx < size; idx++) {
    arr.push(val);
  }
  return arr;
};
exports.buildArr = buildArr;

const arrayEquals = (arr1, arr2) => {
  return arr1.length === arr2.length
    && arr1.every((val, idx) => val === arr2[idx])
};
exports.arrayEquals = arrayEquals;

const isDivisbleBy = (num, divisor) => num / divisor % 1 === 0;
exports.isDivisbleBy = isDivisbleBy;

const primeFactors = num => {
  if (num === 1) return [];

  for (let factor = 2; factor <= Math.sqrt(num); factor++) {
    if (isDivisbleBy(num, factor)) return [factor, ...primeFactors(num / factor)];
  }

  return [num];
};
exports.primeFactors = primeFactors;

const lcm = (...nums) =>
  nums.map(primeFactors).reduce((lcmSoFar, factors) =>
    factors.reduce((acc, factor) =>
      isDivisbleBy(acc, factor) ? acc : acc * factor, lcmSoFar), 1);
exports.lcm = lcm;