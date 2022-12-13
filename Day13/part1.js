import { getAllLines } from '../global.js';
import _ from 'lodash';
import { parse } from 'yaml';

const input = getAllLines('day13/input.txt').filter((i) => i !== '');

let sum = 0;
let count = 0;
for (let i = 0; i < input.length; i += 2) {
  count++;

  var listOne = parse(input[i]);
  var listTwo = parse(input[i + 1]);

  if (compare(listOne, listTwo) < 0) {
    sum += count;
  }
}

console.log(sum);

// ---------- FUNCTIONS ----------

function compare(one, two) {
  if (_.isNumber(one) && _.isNumber(two)) {
    return one - two;
  }

  if (_.isNumber(one)) one = [one];
  if (_.isNumber(two)) two = [two];

  for (let i = 0; i < Math.min(one.length, two.length); i++) {
    var result = compare(one[i], two[i]);
    if (result !== 0) return result;
  }
  return one.length - two.length;
}
