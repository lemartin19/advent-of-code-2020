
const { INPUT } = require('./day8-input');

const COMMANDS = {
  nop: ({ acc, idx }) => ({ acc, idx: idx + 1 }),
  acc: ({ acc, idx }, diff) => ({ acc: acc + diff, idx: idx + 1 }),
  jmp: ({ acc, idx }, diff) => ({ acc, idx: idx + diff })
};

const executeToRepeat = (instructions, fn = allowError, vals = { acc: 0, idx: 0 }, seen = []) => {
  while (vals.idx < instructions.length && !seen.includes(vals.idx)) {
    const { cmd, diff } = instructions[vals.idx].match(/(?<cmd>acc|nop|jmp) (?<diff>-?[0-9]+)/).groups;
    seen = [...seen, vals.idx];
    vals = fn(instructions, vals, seen, { cmd, diff });
  }
  return vals;
};

const allowError = (instructions, vals, seen, { cmd, diff }) => COMMANDS[cmd](vals, Number(diff));
const solutionFinder = (instructions, vals, seen, { cmd, diff }) => {
  if (cmd === 'acc') return COMMANDS[cmd](vals, Number(diff));

  const maybeAnswer = ['jmp', 'nop'].reduce((acc, testCmd) => {
    const testVals = COMMANDS[testCmd](vals, Number(diff));
    const result = executeToRepeat(instructions, allowError, testVals, seen);
    return result.idx === instructions.length ? result : acc;
  }, null);
  return maybeAnswer || COMMANDS[cmd](vals, Number(diff)); 
};

const { acc } = executeToRepeat(INPUT);
const { acc: solved } = executeToRepeat(INPUT, solutionFinder);
console.log(`result pt 1: ${acc}`);
console.log(`result pt 2: ${solved}`);