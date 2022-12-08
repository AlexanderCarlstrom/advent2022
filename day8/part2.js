import { getAllLines } from '../global.js';
import _ from 'lodash';

let input = getAllLines('day8/input.txt');

input = input.map((i) => i.split(''));
const scores = [];

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (i === 0 || j === 0 || i === input.length - 1 || j === input[i].length - 1) {
    } else {
      scores.push(getTreeScore(i, j));
    }
  }
}

console.log(Math.max(...scores));

function getTreeScore(row, column) {
  const tree = input[row][column];
  // TOP
  let top = 0;
  for (let i = row - 1; i >= 0; i--) {
    top++;
    if (input[i][column] >= tree) break;
  }
  // RIGHT
  let right = 0;
  for (let i = column + 1; i < input[row].length; i++) {
    right++;
    if (input[row][i] >= tree) break;
  }
  // BOTTOM
  let bottom = 0;
  for (let i = row + 1; i < input.length; i++) {
    bottom++;
    if (input[i][column] >= tree) break;
  }
  // LEFT
  let left = 0;
  for (let i = column - 1; i >= 0; i--) {
    left++;
    if (input[row][i] >= tree) break;
  }
  return top * right * bottom * left;
}
