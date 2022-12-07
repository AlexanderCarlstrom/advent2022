import { getAllLines } from '../global.js';
import _ from 'lodash';

const input = getAllLines('day7/input.txt');
const folders = [];
let current = [];

input.forEach((line, i) => {
  const parts = line.split(' ');
  if (line[0] === '$') {
    executeCommand(line);
  } else {
    if (!isNaN(parts[0])) {
      getCurrent().push(parseInt(parts[0]));
    }
  }
});

let sum = 0;
goThroughArray(folders);

function goThroughArray(arr) {
  let folderSum = 0;
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      folderSum += goThroughArray(item);
    } else {
      folderSum += item;
    }
  });

  if (folderSum <= 100000) {
    sum += folderSum;
  }
  return folderSum;
}

console.log(sum);

function executeCommand(line) {
  const parts = line.split(' ');
  if (parts[1] === 'cd') {
    if (parts[2] === '..') {
      current.pop();
    } else if (parts[2] === '/') {
      current = [];
    } else {
      const currentFolder = getCurrent();
      currentFolder.push([]);
      current.push(currentFolder.length - 1);
    }
  }
}

function getCurrent() {
  if (current.length === 0) return folders;

  let temp = folders;
  current.forEach((n) => {
    temp = temp[n];
  });

  return temp;
}
