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
const folderSums = [];
goThroughArray(folders);

function goThroughArray(arr) {
  let folderSum = 0;
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      folderSum += goThroughArray(item);
      // goThroughArray(item);
    } else {
      folderSum += item;
    }
  });

  sum += folderSum;
  folderSums.push(folderSum);

  return folderSum;
}

const availableSpace = 70000000 - Math.max(...folderSums);
const requiredSpace = 30000000 - availableSpace;

// let smallest = 70000000;
// folderSums
//   .filter((f) => f >= requiredSpace)
//   .forEach((folder, i) => {
//     // console.log(folder);
//     if (folder < smallest) {
//       console.log(i, folder);
//       smallest = folder;
//     }
//   });

const smallest = Math.min(...folderSums.filter((f) => f >= requiredSpace));

console.log(smallest);

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
