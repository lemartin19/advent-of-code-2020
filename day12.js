
const { INPUT } = require('./day12-input');


const turn = (dir, degree) => {
  if (degree === 0) return dir;

  const NEXT = { N: 'W', E: 'N', S: 'E', W: 'S' };
  return turn(NEXT[dir], degree - 90);
};

const move = (action, num, { ns, ew }) => {
  switch (action) {
    case 'N':
      return { ns: ns + num, ew };
    case 'S':
      return { ns: ns - num, ew };
    case 'E':
      return { ns, ew: ew + num };
    case 'W':
      return { ns, ew: ew - num };
  }
}

const followDir = ({ action, num }) => ({ dir, ns, ew }) => {
  switch (action) {
    case 'F':
      return { dir, ...move(dir, num, { ns, ew }) };
    case 'L':
      return { dir: turn(dir, num), ns, ew };
    case 'R':
      return { dir: turn(dir, 360 - num), ns, ew };
    default:
      return { dir, ...move(action, num, { ns, ew }) };
  }
};

const rotateWaypoint = (num, wpns, wpew) => {
  if (num === 0) return { wpns, wpew };
  return rotateWaypoint(num - 90, wpew, -wpns);
};

const followWaypoint = ({ action, num }) => ({ wpns, wpew, ns, ew }) => {
  switch (action) {
    case 'N':
      return { wpns: wpns + num, wpew, ns, ew };
    case 'S':
      return { wpns: wpns - num, wpew, ns, ew };
    case 'E':
      return { wpns, wpew: wpew + num, ns, ew };
    case 'W':
      return { wpns, wpew: wpew - num, ns, ew };
    case 'F':
      return { wpns, wpew, ns: ns + num * wpns, ew: ew + num * wpew };
    case 'L':
      return { ...rotateWaypoint(num, wpns, wpew), ns, ew };
    case 'R':
      return { ...rotateWaypoint(360 - num, wpns, wpew), ns, ew };
  }
};

const finalState = (directions, instructionTranslator, startingState) => 
  directions
    .map(cmd => {
      const { action, val } = cmd.match(/(?<action>[NSEWFLR])(?<val>\d+)/).groups;
      const num = Number(val);
      return { action, num };
    })
    .map(instructionTranslator)
    .reduce((acc, fn) => fn(acc), startingState);

const calcManhattanDistance = state => Math.abs(state.ns) + Math.abs(state.ew);

const end = finalState(INPUT, followDir, { dir: 'E', ns: 0, ew: 0 });
const result = calcManhattanDistance(end);
const end2 = finalState(INPUT, followWaypoint, { wpns: 1, wpew: 10, ns: 0, ew: 0 });
const result2 = calcManhattanDistance(end2);
console.log(`result pt 1: ${result}`);
console.log(`result pt 1: ${result2}`);
