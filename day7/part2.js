import { getAllLines, getNumbersFromString } from '../global.js';
import _ from 'lodash';

const input = getAllLines('day6/input.txt');
input.forEach((line) => {
  let letters = [];

  loop: for (let i = 0; i < line.length; i++) {
    if (_.includes(letters, line[i])) {
      const index = _.indexOf(letters, line[i]);
      letters = letters.slice(index + 1);
      letters.push(line[i]);
    } else {
      letters.push(line[i]);

      if (letters.length === 14) {
        console.log(i + 1);
        break loop;
      }
    }
  }
});
