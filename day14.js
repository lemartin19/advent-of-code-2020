
const { INPUT } = require('./day14-input');

const maskNum = (mask, num) => {
  const binNum = num.toString(2).split('').reverse();
  const maskedNum = mask
    .map((val, idx) => 
      val === 'X' ? (binNum[idx] || '0') : val)
    .reduce((numSoFar, digit, idx) => 
      numSoFar + 2 ** idx * Number(digit), 0);
  return maskedNum;
};

const maskNumV2 = (mask, num) => {
  const binNum = num.toString(2).split('').reverse();
  const maskedNums = mask
    .map((val, idx) => 
      val === '0' ? (binNum[idx] || '0') : val)
    .reduce((numsSoFar, digit, idx) => {
      if (digit === 'X') {
        const ones = numsSoFar.map(num => num + 2 ** idx);
        return [...numsSoFar, ...ones]
      }
      return numsSoFar.map(num => num + 2 ** idx * Number(digit))
    }, [0]);
  return maskedNums;
};

const applyMasks = (input, updateAddrFn) => {
  const memory = {};
  input.reduce((currMask, cmd) => {
    const { mask, address, num } = cmd.match(/(mask = (?<mask>[01X]{36}))|(mem\[(?<address>\d+)\] = (?<num>\d+))/).groups;
    if (address) updateAddrFn(memory, currMask, address, num)
    return mask ? mask.split('').reverse() : currMask;
  }, []);
  return memory;
}

const updateV1 = (memory, mask, address, num) =>
  memory[address] = maskNum(mask, Number(num));
const updateV2 = (memory, mask, address, num) =>
  maskNumV2(mask, Number(address)).forEach(addr => memory[addr] = Number(num));
const sumVals = memory => Object.values(memory).reduce((acc, num) => acc + num);

const memory1 = applyMasks(INPUT, updateV1);
const result1 = sumVals(memory1);
const memory2 = applyMasks(INPUT, updateV2);
const result2 = sumVals(memory2);
console.log(`result pt 1: ${result1}`);
console.log(`result pt 2: ${result2}`);