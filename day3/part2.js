import { getAllLines, getAlphabetPosition } from '../global.js';
import _ from 'lodash';

const lines = getAllLines('day3/input.txt');
let sum = 0;

for (let i = 0; i < lines.length; i += 3) {
  const group = [lines[i].split(''), lines[i + 1].split(''), lines[i + 2].split('')];
  const firstCommon = _.intersection(group[0], group[1]);
  const secondCommon = _.intersection(firstCommon, group[2]);

  secondCommon.forEach((letter) => {
    const pos = getAlphabetPosition(letter);
    if (letter === letter.toLowerCase()) {
      sum += pos;
    } else {
      sum += pos + 26;
    }
  });
}

console.log(sum);
