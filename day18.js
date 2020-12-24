const { INPUT } = require('./day18-input');

const ADD = '+';
const MULTIPLY = '*';
const operator = op => {
  switch (op) {
    case ADD:
      return (a, b) => a + calcLeftToRight(b);
    case MULTIPLY:
      return (a, b) => a * calcLeftToRight(b);
    default:
      return a => a;
  }
};

const findMatchingParen = expression => {
  let currIdx = expression.length - 1;
  let parenCount = 1;
  while (parenCount > 0) {
    currIdx += -1;
    if (expression[currIdx] === '(') parenCount += -1;
    if (expression[currIdx] === ')') parenCount += 1;
  }
  return currIdx;
};

const matchExpression = expression => {
  if (!expression.endsWith(')'))
    return expression.match(/^((?<first>.*) (?<op>\+|\*) )?(?<digit>\d+)$/).groups;

  const openingParen = findMatchingParen(expression);
  const parens = expression.slice(openingParen + 1, expression.length - 1);
  const outside = expression.slice(0, openingParen);
  const { first, op } = outside.match(/^((?<first>.*) (?<op>\+|\*) )?/).groups
  return { first, op, parens };
};

const calcLeftToRight = expression => {
  const { parens, digit, op, first } = matchExpression(expression);
  const right = digit ? Number(digit) : calcLeftToRight(parens);
  const fn = operator(op);
  return fn(right, first);
};

const insertParen = expression => {
  if (!expression.endsWith(')')) {
    const { all, digit } = expression.match(/(?<all>.*)(?<digit>\d)/).groups;
    return `${all}(${digit}`;
  }

  const openingParen = findMatchingParen(expression);
  const all = expression.slice(0, openingParen);
  const parens = expression.slice(openingParen);
  return `${all}(${parens}`;
};

const resolveAddition = expression => {
  const { first, op, parens, digit } = matchExpression(expression);
  const last = digit || `(${resolveAddition(parens)})`; 
  if (!op) return last;

  const resolvedFirst = resolveAddition(first);
  return op === MULTIPLY ?
    `${resolvedFirst} ${op} ${last}` :
    `${insertParen(resolvedFirst)} ${op} ${last})`;
};

const calcAddFirst = expression => {
  const parensAroundAdd = resolveAddition(expression);
  return calcLeftToRight(parensAroundAdd);
};

const values1 = INPUT.map(calcLeftToRight);
const values2 = INPUT.map(calcAddFirst);
const sum1 = values1.reduce((a, b) => a + b);
const sum2 = values2.reduce((a, b) => a + b);
console.log(`result pt 1: ${sum1}`);
console.log(`result pt 2: ${sum2}`);