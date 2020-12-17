
const { RULES, ALL_TICKETS, MY_TICKET } = require('./day16-input');

const ruleMap = {};
RULES.split('\n').forEach(rule => {
  const { name, low1, high1, low2, high2 } = rule.match(
    /(?<name>[a-z ]+): (?<low1>\d+)-(?<high1>\d+) or (?<low2>\d+)-(?<high2>\d+)/
  ).groups;
  ruleMap[name] = val =>
    (Number(low1) <= val && val <= Number(high1)) ||
    (Number(low2) <= val && val <= Number(high2));
});

const worksForAny = field =>
  Object.values(ruleMap).some(rule => rule(field));

const countErrors = ticket => 
  ticket.reduce((errorRate, field) =>
    worksForAny(field) ? errorRate : errorRate + field, 0);

const errorScanningRate = tickets => 
  tickets.reduce((numErrors, ticket) =>
    numErrors + countErrors(ticket), 0);

const ticketIsValid = ticket =>
  ticket.every(field => worksForAny(field))

const discardInvalidTickets = tickets =>
  tickets.filter(ticketIsValid);

const eliminateInvalid = (possibleConfig, ticket) =>
  possibleConfig.map((possibilities, idx) =>
    possibilities.filter(ruleName =>
      ruleMap[ruleName](ticket[idx])));

const removeIfLastOption = (possibleConfig, config) =>
  possibleConfig
    .map((possibilites, idx) => {
      if (possibilites.length === 1) {
        config[idx] = possibilites[0];
      }
      return possibilites;
    })
    .map(possibilities => 
      possibilities.filter(possibility => 
        !config.includes(possibility)
      )
    );

const findValidOrder = tickets => {
  const validTickets = discardInvalidTickets(tickets);

  let idx = 0;
  let possibleConfig = validTickets[0].map(() => Object.keys(ruleMap));
  let config = validTickets[0].map(() => null);
  while (config.some(field => !field)) {
    possibleConfig = eliminateInvalid(possibleConfig, validTickets[idx]);
    while (possibleConfig.some(possibilites => possibilites.length === 1)) {
      possibleConfig = removeIfLastOption(possibleConfig, config);
    }
    idx++;
  }
  return config;
};

const sumDepartures = (tickets, myTicket) => {
  const fieldOrdering = findValidOrder(tickets);
  return fieldOrdering.reduce((acc, field, idx) =>
    field.startsWith('departure') ? acc * myTicket[idx] : acc, 1);
}

const errorRate = errorScanningRate(ALL_TICKETS);
const departureSum = sumDepartures(ALL_TICKETS, MY_TICKET);
console.log(`result pt 1: ${errorRate}`);
console.log(`result pt 2: ${departureSum}`);