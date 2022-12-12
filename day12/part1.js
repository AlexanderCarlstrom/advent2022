import { getAllLines, getAlphabetPosition } from '../global.js';
import _ from 'lodash';

const input = getAllLines('day12/fake.txt');
const map = [];
let start = { x: 0, y: 0 };
let end = { x: 0, y: 0 };
let currentPos = { x: 0, y: 0 };
let currentHeight = 0;
const paths = [];

input.forEach((line, i) => {
  map.push(line.split(''));
  var s = _.indexOf(line.split(''), 'S');
  if (s !== -1) {
    start = { x: s, y: i };
    currentPos = start;
  }

  var e = _.indexOf(line.split(''), 'E');
  if (e !== -1) {
    end = { x: e, y: i };
  }
});

console.log(map[0].length);
step('', start, 0);
console.log();

// ---------- FUNCTIONS ----------

function step(prev, pos, stepCount, visited) {
  if (paths.length > 5 || pos.x >= map[0].length || pos.y >= map.length) return;
  if (map[pos.y][pos.x] === 'E') {
    paths.push(stepCount);
  }

  // UP
  const top = { x: pos.x, y: pos.y - 1 };
  if (prev !== 'down' && positionExists(pos, top) && checkHeight(pos, top)) {
    step('up', top, stepCount + 1);
  }
  // RIGHT
  const right = { x: pos.x + 1, y: pos.y - 1 };
  if (prev !== 'left' && positionExists(pos, right) && checkHeight(pos, right)) {
    step('right', right, stepCount + 1);
  }
  // DOWN
  const down = { x: pos.x, y: pos.y + 1 };
  if (prev !== 'up' && positionExists(pos, down) && checkHeight(pos, down)) {
    step('down', down, stepCount + 1);
  }
  // LEFT
  const left = { x: pos.x + 1, y: pos.y - 1 };
  if (prev !== 'right' && positionExists(pos, left) && checkHeight(pos, left)) {
    step('left', left, stepCount + 1);
  }
}

function checkHeight(pos1, pos2) {
  if (!positionExists(pos1) || !positionExists(pos2)) return false;
  return getAlphabetPosition(map[pos2.y][pos2.x]) - getAlphabetPosition(map[pos1.y][pos1.x]) <= 1;
}

function positionExists(pos) {
  return pos.y < map.length && pos.x < map[0].length;
}

function getAdjusent(prev, pos, visited) {
  const adjusent = [];
  // TOP
  if (prev !== 'down') adjusent.push({ x: pos.x, y: pos.y - 1, dir: 'up' });
  if (prev !== 'left') adjusent.push({ x: pos.x + 1, y: pos.y, dir: 'right' });
  if (prev !== 'up') adjusent.push({ x: pos.x, y: pos.y + 1, dir: 'down' });
  if (prev !== 'right') adjusent.push({ x: pos.x - 1, y: pos.y, dir: 'left' });

  return adjusent.filter((p) => !_.includes(visited, p));
}
