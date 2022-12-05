import { getAllLines, getNumbersFromString } from '../global.js';
import _ from 'lodash';

const lines = getAllLines('day5/input.txt');
const stacks = [];
const instructions = [];
let endMap = false;

lines.forEach((line, index) => {
  if (endMap) instructions.push(getNumbersFromString(line));

  if (line === '') endMap = true;

  if (!endMap) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '[') {
        const pos = i / 4;
        if (!stacks[pos]) stacks[pos] = [];
        stacks[pos].push(line[i + 1]);
      }
    }
  }
});

for (let i = 0; i < stacks.length; i++) {
  stacks[i] = stacks[i].reverse();
}

for (let i = 0; i < instructions.length; i++) {
  const instruction = instructions[i];
  for (let j = 0; j < instruction[0]; j++) {
    const crate = stacks[instruction[1] - 1].pop();
    stacks[instruction[2] - 1].push(crate);
  }
}

let sum = '';

stacks.forEach((stack) => {
  sum += stack[stack.length - 1];
});

console.log(sum);
