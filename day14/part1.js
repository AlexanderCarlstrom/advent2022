import { getAllLines } from '../global.js';
import _ from 'lodash';

const input = getAllLines('day14/input.txt');
const lines = input.map((i) =>
  i.split(' -> ').map((l) => {
    const pos = l.split(',');
    return { row: parseInt(pos[1]), col: parseInt(pos[0]) };
  })
);
// console.log(lines);

const map = [];
const rows = lines.flat().map((l) => l.row);
const cols = lines.flat().map((l) => l.col);
const rowDiff = [Math.min(...rows), Math.max(...rows)];
const colDiff = [Math.min(...cols), Math.max(...cols)];

const row = (y) => y - rowDiff[0] + 7;
const col = (x) => x - colDiff[0] + 1;

for (let i = 0; i < rowDiff[1] - rowDiff[0] + 15; i++) {
  map[i] = [];
  for (let j = 0; j < colDiff[1] - colDiff[0] + 3; j++) {
    map[i][j] = '.';
  }
}

lines.forEach((line) => createPath(line));

let go = true;
let count = 0;
while (go) {
  go = dropSand({ row: -1, col: col(500) });
  count++;
}

printMap();
console.log(count - 1);

// ---------- FUNCTIONS ----------

function createPath(line) {
  let prev = line[0];
  line.forEach((pos) => {
    if (pos.col !== prev.col) {
      const start = Math.min(pos.col, prev.col);
      const end = Math.max(pos.col, prev.col);
      for (let i = start; i <= end; i++) {
        map[row(pos.row)][col(i)] = '#';
      }
    } else if (pos.row !== prev.row) {
      const start = Math.min(pos.row, prev.row);
      const end = Math.max(pos.row, prev.row);
      for (let i = start; i <= end; i++) {
        map[row(i)][col(pos.col)] = '#';
      }
    }

    prev = pos;
  });
}

function dropSand(start) {
  let run = true;
  let current = start;

  while (run) {
    if (isOutside({ row: current.row + 1, col: current.col })) break;
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

    map[current.row][current.col] = 'o';
    run = false;
  }

  return !run;
}

function isDown(pos) {
  return map[pos.row + 1][pos.col] === '.';
}

function isLeft(pos) {
  return map[pos.row + 1][pos.col - 1] === '.';
}

function isRight(pos) {
  return map[pos.row + 1][pos.col + 1] === '.';
}

function isOutside(pos) {
  if (pos.row >= map.length) return true;
  if (pos.col >= map[pos.row].length) return true;
  return false;
}

function printMap() {
  map.forEach((line, i) => {
    console.log(line.join(' '));
    if (i === map.length - 1) {
      console.log(Array(line.length * 2).join('-'));
    }
  });
}
