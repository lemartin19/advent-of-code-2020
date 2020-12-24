
const { INPUT } = require('./day17-input');

const ACTIVE = '#';
const INACTIVE = '.';

const processInput = input => input.split('\n').map(row => row.split(''));

const getCoords = key => {
  const { x, y, z, w } = key.match(/(?<x>-?\d+),(?<y>-?\d+),(?<z>-?\d+)(,(?<w>-?\d+))?/).groups;
  return { x: Number(x), y: Number(y), z: Number(z), w: w && Number(w) };
};

const translateInput = (input, moreAxes) => {
  const grid = {};
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const key = moreAxes.reduce(withoutAxis => `${withoutAxis},0`, `${x},${y}`);
      grid[key] = input[y][x];
    }
  }
  return grid;
};

const getKeysInRange = minMax => 
  Object.keys(minMax).reduce((acc, axis) => {
    const thisAxisValues = [];
    const { min, max } = minMax[axis];
    for (let i = min - 1; i <= max + 1; i++) {
      thisAxisValues.push(i);
    }
    return thisAxisValues
      .map(val => acc.length === 0 ? [val] : acc.map(key => `${key},${val}`))
      .reduce((all, curr) => all.concat(curr));
  }, []);

const countActiveNeighbors = (currVal, grid, axes) => {
  const minMax = {};
  axes.forEach(axis => {
    const thisAxis = {};
    thisAxis['min'] = currVal[axis];
    thisAxis['max'] = currVal[axis];
    minMax[axis] = thisAxis;
  });

  const currKey = axes.reduce((keySoFar, axis) => keySoFar ? `${keySoFar},${currVal[axis]}` : currVal[axis], '');
  const keysToCheck = getKeysInRange(minMax);
  return keysToCheck.reduce(
    (activeCount, key) => key !== currKey && grid[key] === ACTIVE ? activeCount + 1 : activeCount,
    0
  );
};

const nextNSequences = (input, n, axes) => {
  if (n === 0) return input;
  const minMax = {};
  axes.forEach(axis => {
    minMax[axis] = {};
  });

  Object.keys(input).map(key => {
    const coords = getCoords(key);
    Object.values(axes).map(axis => {
      const { min, max } = minMax[axis];
      minMax[axis] = {
        min: min !== undefined ? Math.min(min, coords[axis]) : coords[axis],
        max: max !== undefined ? Math.max(max, coords[axis]) : coords[axis] ,
      }
    });
  });

  const allKeys = getKeysInRange(minMax);

  const grid = {};
  allKeys.forEach(key => {
    const coords = getCoords(key);
    const activeNeighbors = countActiveNeighbors(coords, input, axes);
    const isActive = activeNeighbors === 3 || (activeNeighbors === 2 && input[key] === ACTIVE);
    grid[key] = isActive ? ACTIVE : INACTIVE;
  });

  return nextNSequences(grid, n - 1, axes);
};

const countActive = input =>
  Object.values(input).reduce(
    (sum, current) => current === ACTIVE ? sum + 1 : sum, 0
  );

const help = getKeysInRange({ x: { min: -1, max: -1 }, y: { min: 0, max: 0 }, z: { min: -1, max: -1 }});


const processed = processInput(INPUT);
const grid3D = translateInput(processed, ['z']);
const finalGrid3D = nextNSequences(grid3D, 6, ['x', 'y', 'z']);
const activeCount3D = countActive(finalGrid3D);
// const grid4D = translateInput(processed, ['z', 'w']);
// const finalGrid4D = nextNSequences(grid4D, 6, ['x', 'y', 'z', 'w']);
// const activeCount4D = countActive(finalGrid4D);
console.log(`result pt 1: ${activeCount3D}`);
// console.log(`result pt 2: ${activeCount4D}`);