import { readFileSync } from 'node:fs';

const input = readFileSync('day15/input.txt', { encoding: 'utf-8' }).trim().split('\n');
const max = 4000000;

function getInput() {
  return input.map((line) => {
    const parts = line.replaceAll(',', '').replaceAll(':', '').split(' ');
    const sensor = { x: Number(parts[2].split('=')[1]), y: Number(parts[3].split('=')[1]) };
    const beacon = { x: Number(parts[8].split('=')[1]), y: Number(parts[9].split('=')[1]) };
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
    for (let i = 0; i < lines.length; i++) {
      const { sensor, range } = lines[i];
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

    const intervals = [];
    ranges.forEach((range) => {
      intervals.push({
        from: Math.max(range.from, 0),
        to: Math.min(range.to, max),
      });
    });

    if (intervals.length > 1) {
      const x = intervals[0].to + 1;
      console.log(x, y);
      console.log(x * 4000000 + y);
      return;
    }
  }
}

solve();
