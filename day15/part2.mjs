import { readFileSync } from 'node:fs';

const regexp =
  /Sensor at x=(?<sensorX>-?\d+), y=(?<sensorY>-?\d+): closest beacon is at x=(?<beaconX>-?\d+), y=(?<beaconY>-?\d+)/;
const input = readFileSync('day15/input.txt', { encoding: 'utf-8' })
  .trim()
  .split('\n')
  .map((line) => line.match(regexp).groups);
const max = input.length === 14 ? 20 : 4000000;

function getInput() {
  return input.map((line) => {
    const sensor = { x: Number(line.sensorX), y: Number(line.sensorY) };
    const beacon = { x: Number(line.beaconX), y: Number(line.beaconY) };
    const range = getDistance(sensor, beacon);
    return { sensor, range };
  });
}

function getDistance(pos1, pos2) {
  const dx = Math.abs(pos1.x - pos2.x);
  const dy = Math.abs(pos1.y - pos2.y);

  return dx + dy;
}

function solve() {
  const lines = getInput();
  for (let y = 0; y < max; y++) {
    const ranges = [];
    for (const { sensor, range } of lines) {
      const minDistance = getDistance(sensor, { x: sensor.x, y });
      if (minDistance <= range) {
        const sensorYRange = range - minDistance;
        const from = sensor.x - sensorYRange;
        const to = sensor.x + sensorYRange;

        if (to < 0 || from > max) {
          continue;
        }
        ranges.push({ from, to });
      }
    }

    ranges.sort((a, b) => a.from - b.from);
    for (let i = 1; i < ranges.length; i++) {
      if (ranges[i - 1].to >= ranges[i].from) {
        ranges[i - 1].to = Math.max(ranges[i].to, ranges[i - 1].to);
        ranges.splice(i, 1);
        i--;
      }
    }

    const res = [];
    for (const range of ranges) {
      if (range.from > max || 0 > range.to) continue;
      res.push({ from: Math.max(range.from, 0), to: Math.min(range.to, max) });
    }

    if (res.length > 1) {
      const x = res[0].to + 1;
      console.log(x, y);
      console.log(x * 4000000 + y);
      return;
    }
  }

  console.log(1);
}

solve();
