
const { INPUT } = require('./day7-input');

const findBagIn = (bag, rules, found = {}) => {
  if (found[bag]) return; 

  found[bag] = true;
  const rulesThatContainBag = rules.filter(rule => rule.includes(bag) && !rule.startsWith(bag));
  rulesThatContainBag.forEach(rule => {
    const currentBag = rule.split(' bags')[0];
    findBagIn(currentBag, rules, found);
  });
  return Object.keys(found).length - 1;
};

const countBagsIn = (bag, rules) => {
  const bagRule = rules.find(rule => rule.startsWith(bag));
  const bagsInside = bagRule.match(/\d+ .+? bag/g)

  return bagsInside ? bagsInside.reduce((bagCount, bagInfo) => {
    const info = bagInfo.match(/(?<num>[0-9]+) (?<color>.+?) bag/).groups;
    return bagCount + Number(info.num) * countBagsIn(info.color, rules);
  }, 1) : 1;
};

const BAG = 'shiny gold';
const bagsContain = findBagIn(BAG, INPUT);
const bagsInBags = countBagsIn(BAG, INPUT) - 1;
console.log(`result pt 1: ${bagsContain}`);
console.log(`result pt 2: ${bagsInBags}`);