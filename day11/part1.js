import { getAllLines } from '../global.js';
import _ from 'lodash';

const input = getAllLines('day11/input.txt');
const monkeys = [];
let commonDivisor = 1;

const operators = {
  '+': (x, y) => x + y,
  '*': (x, y) => x * y,
};

input.forEach((line, i) => {
  const split = line.split(' ');
  if (split[0] === 'Monkey') {
    const monkey = {};
    monkey.items = getItems(input[i + 1]);
    monkey.operation = getOperation(input[i + 2]);
    monkey.test = getTest(i + 3);
    monkeys.push(monkey);
  }
});

const monkeyCount = _.range(0, monkeys.length).map((c) => 0);

for (let i = 0; i < 20; i++) {
  monkeys.forEach((monkey, index) => {
    const temp = _.cloneDeep(monkey.items);
    temp.forEach((item) => {
      const worry = Math.floor(monkey.operation(item) / 3);
      const next = monkey.test(worry);
      monkeys[next].items.push(worry);
      monkeyCount[index]++;
    });
    monkey.items = [];
  });
}

const levels = monkeyCount.sort((a, b) => b - a);
console.log(levels[0] * levels[1]);

// ---------- FUNCTIONS ----------

function getItems(line) {
  const numPart = line.split(':')[1].replaceAll(',', '');
  const numbers = numPart
    .trim()
    .split(' ')
    .map((n) => parseInt(n));
  return numbers;
}

function getOperation(line) {
  const part = line.split('=')[1].trim().split(' ');
  return (old) => {
    let num = 0;
    if (part[2] === 'old') num = old;
    else num = parseInt(part[2]);

    return operators[part[1]](old, num);
  };
}

function getTest(i) {
  const num = parseInt(input[i].split(' ')[5]);
  commonDivisor *= num;
  const ifTrue = parseInt(input[i + 1].trim().split(' ')[5]);
  const ifFalse = parseInt(input[i + 2].trim().split(' ')[5]);
  return (x) => (x % num === 0 ? ifTrue : ifFalse);
}
