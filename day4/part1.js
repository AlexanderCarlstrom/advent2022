import { getAllLines } from '../global.js';
import _ from 'lodash';

const lines = getAllLines('day4/input.txt');
let containedPairs = 0;

lines.forEach((line, i) => {
  const numbers = getNumbers(line);

  if (isContained(numbers)) containedPairs++;
});

console.log(containedPairs);

function getNumbers(line) {
  const numbers = [];
  line.split(',').forEach((range) => {
    range.split('-').forEach((num) => {
      numbers.push(parseInt(num));
    });
  });

  return numbers;
}

function isContained(pair) {
  if (pair[0] <= pair[2] && pair[1] >= pair[3]) return true;
  if (pair[2] <= pair[0] && pair[3] >= pair[1]) return true;
  return false;
}
