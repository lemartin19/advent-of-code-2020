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

const matchExpression = expression => {
  if (!expression.endsWith(')'))
    return expression.match(/^((?<first>.*) (?<op>\+|\*) )?(?<digit>\d+)$/).groups;

  let openingParen = expression.length - 1;
  let parenCount = 1;
  while (parenCount > 0) {
    openingParen += -1;
    if (expression[openingParen] === '(') parenCount += -1;
    if (expression[openingParen] === ')') parenCount += 1;
  }

  const parens = expression.slice(openingParen + 1, expression.length - 1);
  const outside = expression.slice(0, openingParen);
  const { first, op } = outside.match(/^((?<first>.*) (?<op>\+|\*) )?/).groups
  return { first, op, parens };
}

const calcLeftToRight = expression => {
  const { parens, digit, op, first } = matchExpression(expression);
  const right = digit ? Number(digit) : calcLeftToRight(parens);
  const fn = operator(op);
  return fn(right, first);
};

const values = INPUT.map(calcLeftToRight);
const sum = values.reduce((a, b) => a + b);
console.log(`result pt 1: ${sum}`);