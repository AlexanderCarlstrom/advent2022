import { getAllLines } from '../global.js';
import _ from 'lodash';
import { LineCounter, parse } from 'yaml';

const input = getAllLines('day14/fake.txt');
const lines = input.map((i) => i.split(' -> '));
console.log(lines);

const map = [];
const rows = lines.map((l) => l.map((i) => i.split(',')[1])).flat();
const cols = lines.map((l) => l.map((i) => i.split(',')[0])).flat();
const rowDiff = [Math.min(...rows), Math.max(...rows)];
const colDiff = [Math.min(...cols), Math.max(...cols)];

const row = (y) => y - rowDiff[0] + 1;
const col = (x) => x - colDiff[0] + 1;

for (let i = 0; i < rowDiff[1] - rowDiff[0] + 3; i++) {
  map[i] = [];
  for (let j = 0; j < colDiff[1] - colDiff[0] + 3; j++) {
    map[i][j] = '.';
  }
}

// for (let i = rowDiff[0] - 1; i < rowDiff[1] + 1; i++) {
//   for (let j = colDiff[0] - 1; i < colDiff[1] + 1; i++) {
//     map.push({ row: i, col: j, val: '.'});
//   }
// }

// lines.forEach((line) => createPath(line));
findPath(lines[0]);
printMap();

// ---------- FUNCTIONS ----------

function findPath(line) {
  let prev = line[0].split(',');
  line.forEach((l) => {
    const pos = l.split(',');

    if (pos[1] !== prev[1]) {
      const start = Math.min(pos[1], prev[1]);
      const end = Math.max(pos[1], prev[1]);
      for (let i = start; i <= end; i++) {
        console.log(i);
        map[row(i)][col(pos[0])] = '#';
      }
    }

    prev = pos;
  });
}

function createPath(path) {
  let prev = path[0].split(',');
  path.forEach((p) => {
    const pos = p.split(',');

    if (p[0] !== prev[0]) {
      _.range(prev[0], p[0]).forEach((r) => {
        map[row(pos[1])][col(r)] = '#';
      });
    } else if (p[1] !== prev[1]) {
      _.range(prev[1], p[1]).forEach((r) => {
        map[row(r)][col(pos[0])] = '#';
      });
    }
    prev = p;
  });
}

function printMap() {
  map.forEach((line) => {
    console.log(line.join(''));
  });
}
