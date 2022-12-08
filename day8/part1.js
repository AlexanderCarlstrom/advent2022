import { getAllLines } from '../global.js';
import _ from 'lodash';

let input = getAllLines('day8/input.txt');

input = input.map((i) => i.split(''));
let visible = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (i === 0 || j === 0 || i === input.length - 1 || j === input[i].length - 1) {
      visible++;
    } else {
      if (!checkForTrees(i, j)) {
        visible++;
      }
    }
  }
}

console.log(visible);

function checkForTrees(row, column) {
  const tree = input[row][column];
  // TOP
  let top = false;
  for (let i = row - 1; i >= 0; i--) {
    if (input[i][column] >= tree) top = true;
  }
  if (!top) return false;
  // RIGHT
  let right = false;
  for (let i = column + 1; i < input[row].length; i++) {
    if (input[row][i] >= tree) right = true;
  }
  if (!right) return false;
  // BOTTOM
  let bottom = false;
  for (let i = row + 1; i < input.length; i++) {
    if (input[i][column] >= tree) bottom = true;
  }
  if (!bottom) return false;
  // LEFT
  let left = false;
  for (let i = column - 1; i >= 0; i--) {
    if (input[row][i] >= tree) left = true;
  }
  if (!left) return false;
  return true;
}
