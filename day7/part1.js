import { getAllLines, getNumbersFromString } from '../global.js';
import _ from 'lodash';

const input = getAllLines('day7/fake.txt');
const folders = [];
let current = [];

input.forEach((line, i) => {
  const parts = line.split(' ');
  console.log(parts);
  if (line[0] === '$') {
    executeCommand(line);
  } else {
    if (!isNaN(parts[0])) {
      console.log(current);
      console.log(folders);
      getCurrent().push(parseInt(parts[0]));
    }
  }
});

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
