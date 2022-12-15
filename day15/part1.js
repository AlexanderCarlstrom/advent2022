import { getAllLines } from '../global.js';
import _ from 'lodash';

const input = getAllLines('day15/input.txt');
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
const numCols = maxCol - minCol;

const pairs = lines
  .map((l) => ({
    sensor: { row: l.sensor.row + Math.abs(minRow), col: l.sensor.col + Math.abs(minCol) },
    beacon: { row: l.beacon.row + Math.abs(minRow), col: l.beacon.col + Math.abs(minCol) },
  }))
  .map((p) => ({ sensor: p.sensor, beacon: p.beacon, distance: getDistance(p.sensor, p.beacon) }));

const maxDistance = Math.max(...pairs.map((p) => p.distance));
const map = [];

console.log(getRow(2000000 + Math.abs(minRow)));

// ---------- FUNCTIONS ----------}

function getRow(row) {
  let count = 0;
  for (let i = 0 - maxDistance * 2; i <= numCols + maxDistance * 2; i++) {
    const current = { row, col: i };
    let shouldCount = false;
    pairs.forEach((pair) => {
      if (getDistance(current, pair.sensor) <= pair.distance) shouldCount = true;
    });

    pairs.forEach((pair) => {
      if (compare(current, pair.sensor) || compare(current, pair.beacon)) shouldCount = false;
    });

    if (shouldCount) count++;
  }

  return count;
}

function compare(pos1, pos2) {
  return pos1.row === pos2.row && pos1.col === pos2.col;
}

function getDistance(pos1, pos2) {
  const dRow = Math.abs(pos1.row - pos2.row);
  const dCol = Math.abs(pos1.col - pos2.col);

  return Math.max(dRow, dCol) + Math.min(dRow, dCol);
}
