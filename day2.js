
const { INPUT } = require('./day2-input');

const isValidPasswordPt1 = (min, max, character, password) => {
  const charMatch = password.match(new RegExp(character, 'g'));
  const charCount = charMatch ? charMatch.length : 0;
  return charCount >= min && charCount <= max;
}

const isValidPasswordPt2 = (first, second, character, password) => {
  const passArr = password.split('');
  const firstChar = passArr[first - 1];
  const secondChar = passArr[second - 1];
  return (firstChar === character && secondChar !== character) ||
   (firstChar !== character && secondChar === character);
}

const numValidPt1 = INPUT.filter(vals => isValidPasswordPt1(...vals)).length;
const numValidPt2 = INPUT.filter(vals => isValidPasswordPt2(...vals)).length;
console.log(`result pt 1: ${numValidPt1}`);
console.log(`result pt 2: ${numValidPt2}`);