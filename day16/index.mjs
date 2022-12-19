import { readFileSync } from 'node:fs';

const input = readFileSync('day16/fake.txt', { encoding: 'utf-8' }).trim().split('\n');

function getInput() {
  const pattern = /^Valve (?<valve>[A-Z]{2}) has flow rate=(?<rate>\d+); tunnels? leads? to valves? (?<edges>.*)/;
  return input.map((line) => {
    const { valve, rate, edges } = line.match(pattern).groups;
    return { valve, rate: parseInt(rate), edges: edges.split(', ') };
  });
}

function dfs(valves) {
  const q = [];
  const time = 30;
  const start = {
    valve: 'AA',
    time,
    flow: 0,
    openValves: {},
  };
  q.push(start);

  let maxFlow = 0;
  while (q.length > 0) {
    const current = q.shift();

    if (current.time <= 0) {
      console.log('ERROR: Ran out of time');
      return;
    }

    const others = Object.values(valves).filter((valve) => valve.rate > 0 && !current.openValves[valve.valve]);
    if (others.length === 0) {
    }
  }
}

function solve_part_1() {
  const valves = Object.fromEntries(getInput().map((i) => [i.valve, i]));
  dfs(valves);
}

function solve_part_2() {}

solve_part_1();
