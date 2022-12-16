import { readFileSync } from 'node:fs';

// Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
// const regexp = /Valve (?<tunnel>-?\D+) has flow rate=(?<rate>-?\d+); tunnels lead to valves DD, II, BB/;
const input = readFileSync('day16/fake.txt', { encoding: 'utf-8' }).trim().split('\n');
const list = new Map();

function getInput() {
  return input.map((line) => {
    const parts = line.replaceAll(';', '').replaceAll(',', '').split(' ');
    const tunnel = parts[1];
    const flowRate = Number(parts[4].split('=')[1]);
    const tunnels = [];
    for (let i = 9; i < parts.length; i++) {
      tunnels.push(parts[i]);
    }

    return { tunnel, flowRate, tunnels };
  });
}

function addNode(tunnel, flowRate, edges) {
  list.set(tunnel, { flowRate, edges });
}

function solve_part_1() {
  const lines = getInput();

  for (const line of lines) {
    addNode(line.tunnel, line.flowRate, line.tunnels);
  }
  console.log(list);

  for (let i = 30; i > 0; i++) {}
}

function solve_part_2() {}

solve_part_1();
