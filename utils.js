
const buildArr = (size, val = 0) => {
  const arr = [];
  for (let idx = 0; idx < size; idx++) {
    arr.push(val);
  }
  return arr;
};
exports.buildArr = buildArr;
