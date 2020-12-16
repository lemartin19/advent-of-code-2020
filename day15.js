
const { INPUT } = require('./day15-input');

const nthInSequence = (starting, n) => {
  const nums = new Map();

  let last = starting.reduce((acc, val, idx) => {
    nums.set(acc, idx)
    return val;
  });

  let turn = starting.length;
  while (turn < n) {
    if (!nums.has(last)) {
      nums.set(last, turn);
      last = 0;
    }
    else {
      const tmp = nums.get(last);
      nums.set(last, turn)
      last = turn - tmp;
    }
    turn++;
  }
  return last;
};

const num2020 = nthInSequence(INPUT, 2020);
const num30000000 = nthInSequence(INPUT, 30000000);
console.log(`result pt 1: ${num2020}`);
console.log(`result pt 1: ${num30000000}`);