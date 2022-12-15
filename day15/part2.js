import { getAllLines } from '../global.js';
import _ from 'lodash';

// const max = 4000000;
const max = 20;
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
const minRow = Math.min(...rows);
const maxCol = Math.max(...cols);
const minCol = Math.min(...cols);
const numRows = maxRow - minRow;
const numCols = maxCol - minCol;

// const pairs = lines
//   .map((l) => ({
//     sensor: { row: l.sensor.row + Math.abs(minRow), col: l.sensor.col + Math.abs(minCol) },
//     beacon: { row: l.beacon.row + Math.abs(minRow), col: l.beacon.col + Math.abs(minCol) },
//   }))
//   .map((p) => ({ sensor: p.sensor, beacon: p.beacon, distance: getDistance(p.sensor, p.beacon) }));

const pairs = lines
  .map((l) => ({
    sensor: { row: l.sensor.row, col: l.sensor.col },
    beacon: { row: l.beacon.row, col: l.beacon.col },
  }))
  .map((p) => ({ sensor: p.sensor, beacon: p.beacon, distance: getDistance(p.sensor, p.beacon) }))
  .filter((p) => {
    const { row, col } = p.sensor;
    if (row + p.distance > max || row + p.distance < 0) return false;
    if (row - p.distance > max || row - p.distance < 0) return false;
    if (col + p.distance > max || col + p.distance < 0) return false;
    if (col - p.distance > max || col - p.distance < 0) return false;
    return true;
  });

const map = [];
// for (let i = 0; i <= max; i++) {
//   map[i] = [];
//   for (let j = 0; j <= max; j++) {
//     map[i][j] = '.';
//   }
// }
// pairs.forEach((pair) => {
//   if (!isOutside(pair.sensor)) {
//     map[pair.sensor.row][pair.sensor.col] = 'S';
//   }

//   if (!isOutside(pair.beacon)) {
//     map[pair.beacon.row][pair.beacon.col] = 'B';
//   }
// });

main: for (let i = 0; i <= max; i++) {
  for (let j = 0; j <= max; j++) {
    const current = { row: i, col: j };
    let found = false;
    pairs.forEach((pair) => {
      const distance = getDistance(current, pair.sensor);
      if (distance > pair.distance) {
        found = true;
      } else {
        found = false;
        // return;
      }
    });

    if (found) {
      console.log(current);
      break main;
    }
  }
}

console.log(1);

// const maxDistance = Math.max(...pairs.map((p) => p.distance));
// const map = [];

// for (let i = 0; i <= numRows; i++) {
//   map[i] = [];
//   for (let j = 0; j <= numCols; j++) {
//     map[i][j] = '.';
//   }
// }

// pairs.map((p) => buildDiamond(p));
// printMap();

// let empty = [];
// for (let i = 0 + Math.abs(minRow); i < max + Math.abs(minRow); i++) {
//   for (let j = 0 + Math.abs(minCol); j < max + Math.abs(minCol); j++) {
//     if (map[i][j] === '.') empty.push({ row: i, col: j });
//   }
// }
// empty = empty.map((p) => ({ row: p.row - Math.abs(minRow), col: p.col - Math.abs(minCol) }));
// empty = empty.filter(filterLines);
// console.log(empty);
// const freq = empty[0].col * 4000000 + empty[0].row;
// console.log(freq);

// ---------- FUNCTIONS ----------

function calculateFrequenct(pos) {
  const freq = pos.col * 4000000 + pos.row;
  console.log(freq);
}

function isSensorOrBeacon(current, pair) {
  if (compare(current, pair.sensor) || compare(current, pair.beacon)) return true;
  return false;
}

function compare(pos1, pos2) {
  return pos1.row === pos2.row && pos1.col === pos2.col;
}

function buildDiamond(pair) {
  const startRow = pair.sensor.row - pair.distance;
  const startCol = pair.sensor.col - pair.distance;
  for (let i = startRow; i < startRow + pair.distance * 2 + 1; i++) {
    for (let j = startCol; j < startCol + pair.distance * 2 + 1; j++) {
      const current = { row: i, col: j };
      if (isOutside(current)) continue;
      if (getDistance(current, pair.sensor) <= pair.distance) map[i][j] = '#';
    }
  }
}

function filterLines(line) {
  if (line.row < 0 || line.row > max) return false;
  if (line.col < 0 || line.col > max) return false;
  return true;
}

function isOutside(pos) {
  if (pos.row < 0 || pos.row > max) return true;
  if (pos.col < 0 || pos.col > max) return true;
  return false;
}

function printMap(line) {
  map.forEach((line, i) => {
    console.log(line.join(' '));
    if (i === map.length - 1) {
      console.log(Array(line.length * 2).join('-'));
    }
  });
  // const lineToPrint = line + Math.abs(minRow);
  // console.log(map[lineToPrint].join(' '));
}

function getDistance(pos1, pos2) {
  const dRow = Math.abs(pos1.row - pos2.row);
  const dCol = Math.abs(pos1.col - pos2.col);

  return Math.max(dRow, dCol) + Math.min(dRow, dCol);
}
