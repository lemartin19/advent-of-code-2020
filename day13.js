
const { INPUT, TIMESTAMP } = require('./day13-input');
const { lcm } = require('./utils');

const calcEarliestTime = earliest => busId => {
  if (busId === 'x') return { busId, leavingAt: null };
  const numRoutesCompleted = Math.ceil(earliest / busId);
  return { busId, leavingAt: numRoutesCompleted * busId };
};

const firstBusAfter = (allBuses) =>
  allBuses.reduce((minBus, currBus) => 
    currBus.leavingAt && currBus.leavingAt < minBus.leavingAt ? currBus : minBus);

const calcSequentialLeavingTime = schedule => {
  let currTime = 0;
  let idx = 0;
  let increment = 1;

  while (idx < schedule.length) {
    if (schedule[idx] === 'x') idx++;
    else if ((currTime + idx) % schedule[idx] === 0) {
      increment = lcm(increment, schedule[idx]);
      idx++;
    }
    else {
      currTime += increment;
    }
  }

  return currTime;
};

const allBuses = INPUT.map(calcEarliestTime(TIMESTAMP));
const { leavingAt, busId } = firstBusAfter(allBuses);
const waitTime = leavingAt - TIMESTAMP;
const specialTime = calcSequentialLeavingTime(INPUT);

console.log(`result pt 1: ${waitTime * busId}`);
console.log(`result pt 2: ${specialTime}`);