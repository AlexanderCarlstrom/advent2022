import { getAllLines } from '../global.js';
import _ from 'lodash';
import { parse } from 'yaml';

const input = getAllLines('day13/input.txt').filter((i) => i !== '');

const packets = input.sort((a, b) => compare(parse(a), parse(b)));
const first = packets.indexOf('[[2]]') + 1;
const second = packets.indexOf('[[6]]') + 1;
console.log('[[2]]:', first);
console.log('[[6]]:', second);
console.log('result:', first * second);

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
