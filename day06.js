
const { INPUT } = require('./day6-input');

const countAny = questions => Object.values(questions).length;
const countEvery = inputs => questions => Object.values(questions).reduce((acc, val) => val === inputs.length ? acc + 1 : acc, 0);

const countUnique = (inputs, countFn) => {
  const questions = {};

  inputs.forEach(yesAnswers => 
    yesAnswers.split('').forEach(q => {
      questions[q] = questions[q] ? questions[q] + 1 : 1;
    })
  );
  return countFn(questions);
};

const numAny = INPUT.map(inputs => countUnique(inputs, countAny))
const numEvery = INPUT.map(inputs => countUnique(inputs, countEvery(inputs)))
const sumAny = numAny.reduce((count, num) => count + num);
const sumEvery = numEvery.reduce((count, num) => count + num);
console.log(`result pt 1: ${sumAny}`);
console.log(`result pt 2: ${sumEvery}`);