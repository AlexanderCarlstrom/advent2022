import { getAllLines } from '../global.js';
import _ from 'lodash';

const input = getAllLines('day10/input.txt');

let nextStop = 20;
let cycle = 1;
let x = 1;
const stops = [];

input.forEach((line) => {
  const p = line.split(' ');
  update();
  if (p.length > 1) {
    update();
    x += parseInt(p[1]);
  }
});

console.log(stops.reduce((sum, curr) => (sum += curr)));

// ---------- FUNCTIONS ----------

function update() {
  if (cycle === nextStop) {
    stops.push(cycle * x);
    nextStop += 40;
  }

  cycle++;
}
