const fs = require('fs');
import { getAllLines } from '../global';
const fake = 'fakeInput.txt';
const inp = 'input.txt';

let points = 0;

getAllLines(inp).forEach((line, i) => {
  const [elve, me] = line.split(' ');
  points += getPoints(getOption(elve), getOption(me));
});

console.log(points);

function getPoints(elve, me) {
  let points = 0;
  let choice;

  if (me === 1) {
    return lose(elve);
  } else if (me === 2) {
    return 3 + elve;
  } else if (me === 3) {
    return 6 + win(elve);
  }

  return points + me;
}

function win(elve) {
  const result = elve + 1;
  return result > 3 ? 1 : result;
}

function lose(elve) {
  const result = elve - 1;
  return result < 1 ? 3 : result;
}

function getOption(opt) {
  if (opt === 'A' || opt === 'X') return 1;
  if (opt === 'B' || opt === 'Y') return 2;
  if (opt === 'C' || opt === 'Z') return 3;
}

function getAllLines(file) {
  return fs.readFileSync(file, 'utf-8').split(/\r?\n/);
}
