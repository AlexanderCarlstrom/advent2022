import { getAllLines } from '../global.js';
import _ from 'lodash';

const input = getAllLines('day14/input.txt');
const lines = input.map((i) =>
  i.split(' -> ').map((l) => {
    const pos = l.split(',');
    return { row: parseInt(pos[1]), col: parseInt(pos[0]) };
  })
);

const map = [];
const rows = lines.flat().map((l) => l.row);
const cols = lines.flat().map((l) => l.col);
const maxRow = Math.max(...rows) + 2;
const maxCol = Math.max(...cols) * 1.3;

lines.push([
  { row: maxRow, col: 0 },
  { row: maxRow, col: maxCol },
]);

for (let i = 0; i <= maxRow; i++) {
  map[i] = [];
  for (let j = 0; j <= maxCol; j++) {
    map[i][j] = '.';
  }
}

lines.forEach((line) => createPath(line));

let go = true;
let count = 0;
while (go) {
  go = dropSand({ row: 0, col: 500 });
  count++;
}

printMap(300);
console.log(count);

// ---------- FUNCTIONS ----------

function createPath(line) {
  let prev = line[0];
  line.forEach((pos) => {
    if (pos.col !== prev.col) {
      const start = Math.min(pos.col, prev.col);
      const end = Math.max(pos.col, prev.col);
      for (let i = start; i <= end; i++) {
        map[pos.row][i] = '#';
      }
    } else if (pos.row !== prev.row) {
      const start = Math.min(pos.row, prev.row);
      const end = Math.max(pos.row, prev.row);
      for (let i = start; i <= end; i++) {
        map[i][pos.col] = '#';
      }
    }

    prev = pos;
  });
}

function dropSand(start) {
  let run = true;
  let current = start;

  while (run) {
    if (isDown(current)) {
      current = { row: current.row + 1, col: current.col };
      continue;
    }

    if (isLeft(current)) {
      current = { row: current.row + 1, col: current.col - 1 };
      continue;
    }

    if (isRight(current)) {
      current = { row: current.row + 1, col: current.col + 1 };
      continue;
    }

    if (current.row === start.row && current.col === start.col) break;

    map[current.row][current.col] = 'o';
    run = false;
  }

  return !run;
}

function isDown(pos) {
  if (pos.row + 1 >= map.length) return false;
  return map[pos.row + 1][pos.col] === '.';
}

function isLeft(pos) {
  if (pos.row + 1 >= map.length) return false;
  return map[pos.row + 1][pos.col - 1] === '.';
}

function isRight(pos) {
  if (pos.row + 1 >= map.length) return false;
  return map[pos.row + 1][pos.col + 1] === '.';
}

function printMap(skip = 0) {
  map.forEach((line, i) => {
    console.log(line.filter((_, i) => i >= skip).join(''));
    if (i === map.length - 1) {
      console.log(Array(line.length * 2).join('-'));
    }
  });
}
