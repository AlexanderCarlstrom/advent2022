import { getAllLines } from '../global.js';
import _ from 'lodash';

const input = getAllLines('day10/input.txt');

let nextStop = 20;
let cycle = 0;
let x = 1;
const stops = [];
const image = [];

for (let i = 0; i < 6; i++) {
  const row = [];
  for (let j = 0; j < 40; j++) {
    row.push('.');
  }
  image.push(row);
}

input.forEach((line) => {
  const p = line.split(' ');
  update();
  if (p.length > 1) {
    update();
    x += parseInt(p[1]);
  }
});

image.forEach((row) => {
  console.log(row.reduce((sum, curr) => (sum += curr)));
});

// ---------- FUNCTIONS ----------

function update() {
  const position = cycle % 40;
  if (_.includes([x - 1, x, x + 1], position)) {
    image[Math.floor(cycle / 40)][cycle % 40] = '#';
  }
  cycle++;

  if (cycle === nextStop) {
    stops.push(cycle * x);
    nextStop += 40;
  }
}
