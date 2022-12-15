import { getAllLines, getAlphabetPosition } from '../global.js';
import _ from 'lodash';

const input = getAllLines('day15/fake.txt');
const lines = input.map((line) => {
  const parts = line.replaceAll(',', '').replaceAll(':', '').split(' ');
  const sensor = { row: Number(parts[3].split('=')[1]), col: Number(parts[2].split('=')[1]) };
  const beacon = { row: Number(parts[9].split('=')[1]), col: Number(parts[8].split('=')[1]) };

  return { sensor, beacon };
});

const rows = lines.map((l) => l.sensor.row).concat(lines.map((l) => l.beacon.row));
const cols = lines.map((l) => l.sensor.col).concat(lines.map((l) => l.beacon.col));
const maxRow = Math.max(...rows);
const maxCol = Math.max(...cols);
const minRow = Math.min(...rows);
const minCol = Math.min(...cols);

const sensors = lines.map((l) => l.sensor).map(s => { row: 10, col: 10 });
const beacons = lines.map((l) => l.beacon);
const map = [];

for (let i = 0; i < maxRow - minRow; i++) {
  map[i] = [];
  for (let j = 0; j < maxCol - minCol; j++) {
    map[i][j] = '.';
  }
}
const pos = [];
// console.log(getDistance({ col: 5, row: 4 }, { col: 10, row: 9 }));

for (let i = 0; i < maxRow - minRow; i++) {
  for (let j = 0; j < maxCol - minCol; j++) {
    const curr = { row: i, col: j };
    sensors.forEach((s) => {
      // const sensor = { row: s.row + Math.abs(minRow), col: s.col + Math.abs(minCol) };
      const sensor = { row: 9, col: 10 };
      if (getDistance(curr, sensor) < 10) {
        map[i][j] = '#';
      }
    });
  }
}

console.log(pos);
printMap();

// ---------- FUNCTIONS ----------

function printMap() {
  map.forEach((line, i) => {
    console.log(line.join(' '));
    if (i === map.length - 1) {
      console.log(Array(line.length * 2).join('-'));
    }
  });
}

function isNearBeacon(pos) {}

function getDistance(pos1, pos2) {
  const dRow = Math.abs(pos1.row - pos2.row);
  const dCol = Math.abs(pos1.col - pos2.col);

  return Math.max(dRow, dCol) + Math.min(dRow, dCol);
}
