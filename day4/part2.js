import { getAllLines } from '../global.js';
import _ from 'lodash';

const lines = getAllLines('day4/input.txt');
let containedPairs = 0;

lines.forEach((line, i) => {
  const ranges = line.split(/(?:,|-)+/).map((r) => parseInt(r));
  const nums1 = _.range(ranges[0], ranges[1] + 1, 1);
  const nums2 = _.range(ranges[2], ranges[3] + 1, 1);

  if (_.intersection(nums1, nums2).length > 0) containedPairs++;
});

console.log(containedPairs);

function isContained(pair) {
  if (pair[0] <= pair[2] && pair[1] >= pair[3]) return true;
  if (pair[2] <= pair[0] && pair[3] >= pair[1]) return true;
  return false;
}
