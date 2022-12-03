import { getAllLines, getAlphabetPosition } from '../global.js';
import _ from 'lodash';

const lines = getAllLines('day3/input.txt');
let sum = 0;

lines.forEach((line, i) => {
  const middleIndex = Math.floor(line.length / 2);
  const part1 = line.slice(0, middleIndex).split('');
  const part2 = line.slice(middleIndex).split('');

  const intersection = _.intersection(part1, part2);
  intersection.forEach(letter => {
    const pos = getAlphabetPosition(letter);
    if (letter === letter.toLowerCase()) {
      sum += pos;
    } else {
      sum += pos + 26;
    }
  })
})

console.log(sum)