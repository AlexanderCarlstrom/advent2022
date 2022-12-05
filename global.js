import * as fs from 'fs';
import findIndex from 'lodash';

function getAllLines(file) {
  return fs.readFileSync(file, 'utf-8').split(/\r?\n/);
}

function getAlphabetPosition(letter) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const index = alphabet.indexOf(letter.toLowerCase());
  return index + 1;
}

function getNumbersFromString(str) {
  return str
    .split(' ')
    .filter((i) => !isNaN(parseInt(i.trim())))
    .map((i) => parseInt(i.trim()));
}

export { getAllLines, getAlphabetPosition, getNumbersFromString };
