
const { INPUT } = require('./day4-input');

const exists = input => !!input;
const atLeastAtMost = (min, max) => (input = '') => min <= Number(input) && Number(input) <= max;
const heightVal = (input = '') => {
  const num = Number(input.substring(0, input.length - 2));
  return input.endsWith('cm') ?
    atLeastAtMost(150, 193)(num) : atLeastAtMost(59, 76)(num);
}
const hairColor = (input = '') => !!input.match(/^#[0-9a-f]{6}$/)
const eyeColor = (input = '') => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(input);
const passportId = (input = '') => input.length === 9;

const REQUIRED_FIELDS = [
  { key: 'byr', validation: exists },
  { key: 'iyr', validation: exists },
  { key: 'eyr', validation: exists },
  { key: 'hgt', validation: exists },
  { key: 'ecl', validation: exists }, 
  { key: 'hcl', validation: exists },
  { key: 'pid', validation: exists }
];

const REQUIRED_FIELDS_WITH_VALIDATION = [
  { key: 'byr', validation: atLeastAtMost(1920, 2002) },
  { key: 'iyr', validation: atLeastAtMost(2010, 2020) },
  { key: 'eyr', validation: atLeastAtMost(2020, 2030) },
  { key: 'hgt', validation: heightVal },
  { key: 'ecl', validation: eyeColor }, 
  { key: 'hcl', validation: hairColor },
  { key: 'pid', validation: passportId }
];

const findValidPassports = (input, required) => 
  input.filter(pass => 
    required.reduce((acc, { key, validation }) => acc && validation(pass[key]), true));


const numValidPt1 = findValidPassports(INPUT, REQUIRED_FIELDS).length;
const numValidPt2 = findValidPassports(INPUT, REQUIRED_FIELDS_WITH_VALIDATION).length;
console.log(`result pt 1: ${numValidPt1}`);
console.log(`result pt 1: ${numValidPt2}`);
