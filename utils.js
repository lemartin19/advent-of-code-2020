
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
