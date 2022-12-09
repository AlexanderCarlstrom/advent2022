import { getAllLines } from '../global.js';
import _ from 'lodash';

const input = getAllLines('day9/input.txt');

const head = { x: 0, y: 0 };
const knots = [];
const positions = [];

for (let i = 0; i < 9; i++) {
  knots.push({ x: 0, y: 0 });
}

input.forEach((line) => {
  const parts = line.split(' ');
  move(parts[0], parseInt(parts[1]));
});

const uniq = _.uniqWith(positions, _.isEqual);
console.log(uniq.length);

function move(direction, times) {
  for (let i = 0; i < times; i++) {
    if (direction === 'U') {
      head.y++;
    } else if (direction === 'R') {
      head.x++;
    } else if (direction === 'D') {
      head.y--;
    } else if (direction === 'L') {
      head.x--;
    }
    knots.forEach((knot, i) => react(i));
    positions.push({ x: knots[8].x, y: knots[8].y });
  }
}

function react(i) {
  const h = i === 0 ? head : knots[i - 1];
  const yDiff = Math.abs(h.y - knots[i].y);
  const xDiff = Math.abs(h.x - knots[i].x);

  if (yDiff > 1) {
    moveY(h, i);
    if (xDiff === 1) moveX(h, i);
  }

  if (xDiff > 1) {
    moveX(h, i);
    if (yDiff === 1) moveY(h, i);
  }
}

function moveY(h, i) {
  if (h.y > knots[i].y) knots[i].y++;
  else if (h.y < knots[i].y) knots[i].y--;
}

function moveX(h, i) {
  if (h.x > knots[i].x) knots[i].x++;
  else if (h.x < knots[i].x) knots[i].x--;
}
