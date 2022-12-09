import { getAllLines } from '../global.js';
import _ from 'lodash';

const input = getAllLines('day9/input.txt');

const head = { x: 0, y: 0 };
const tail = { x: 0, y: 0 };
const positions = [];

input.forEach((line) => {
  const parts = line.split(' ');
  move(parts[0], parseInt(parts[1]));
});

const uniq = _.uniqWith(positions, _.isEqual);
console.log(uniq.length);

function move(direction, times) {
  for (let i = 0; i < times; i++) {
    if (direction === 'U') moveUp();
    else if (direction === 'R') moveRight();
    else if (direction === 'D') moveDown();
    else if (direction === 'L') moveLeft();
  }
}

function moveUp() {
  head.y++;

  const diff = Math.abs(head.y - tail.y);
  if (head.x === tail.x && diff > 1) tail.y++;
  else if ((tail.x < head.x || tail.x > head.x) && diff > 1) {
    tail.x = head.x;

    if (tail.y !== head.y) tail.y++;
  }
  positions.push({ x: tail.x, y: tail.y });
}

function moveRight() {
  head.x++;

  const diff = Math.abs(head.x - tail.x);
  if (head.y === tail.y && diff > 1) tail.x++;
  else if ((tail.y < head.y || tail.y > head.y) && diff > 1) {
    tail.y = head.y;

    if (tail.x !== head.x) tail.x++;
  }
  positions.push({ x: tail.x, y: tail.y });
}

function moveDown() {
  head.y--;

  const diff = Math.abs(head.y - tail.y);
  if (head.x === tail.x && diff > 1) tail.y--;
  else if ((tail.x < head.x || tail.x > head.x) && diff > 1) {
    tail.x = head.x;

    if (tail.y !== head.y) tail.y--;
  }
  positions.push({ x: tail.x, y: tail.y });
}

function moveLeft() {
  head.x--;

  const diff = Math.abs(head.x - tail.x);
  if (head.y === tail.y && diff > 1) tail.x--;
  else if ((tail.y < head.y || tail.y > head.y) && diff > 1) {
    tail.y = head.y;

    if (tail.x !== head.x) tail.x--;
  }
  positions.push({ x: tail.x, y: tail.y });
}
