import { readFileSync } from 'node:fs';
import _ from 'lodash';

const input = readFileSync('day16/fake.txt', { encoding: 'utf-8' }).trim().split('\n');

function getInput() {
  const pattern = /^Valve (?<valve>[A-Z]{2}) has flow rate=(?<rate>\d+); tunnels? leads? to valves? (?<edges>.*)/;
  const valves = Object.fromEntries(
    input
      .map((line) => {
        const { valve, rate, edges } = line.match(pattern).groups;
        return { valve, rate: parseInt(rate), edges: edges.split(', ') };
      })
      .map((v) => [v.valve, v])
  );

  for (const key in valves) {
    bfs(valves, valves[key]);
  }

  return valves;
}

function bfs(valves, root) {
  const q = [];
  const explored = new Set();
  q.push(root);
  explored.add(root.valve);
  root.paths = {};

  while (q.length > 0) {
    const current = q.shift();
    for (const valve of valves[current.valve].edges) {
      if (explored.has(valve)) continue;
      explored.add(valve);
      root.paths[valve] = (root.paths[current.valve] || 0) + 1;
      q.push(valves[valve]);
    }
  }
}

function addFlow(valves, openValves) {
  return [...openValves].reduce((sum, curr) => (sum += valves[curr].rate), 0);
}

function dfs(valves, part) {
  let i = 0;
  const nonZeroValves = Object.values(valves)
    .filter((v) => v.rate > 0)
    .filter((v) => {
      const result = i % 2 === 0;
      i++;
      return result;
    });
  const q = [];
  const start = {
    node: 'AA',
    time: 26,
    flow: 0,
    open: new Set(),
  };
  q.push(start);

  let maxes = [];
  while (q.length > 0) {
    const current = q.shift();

    let edges = nonZeroValves.filter((v) => !current.open.has(v.valve));
    // if (edges.length > 1) {
    //   edges = edges.splice(0, Math.ceil(edges.length / 2));
    // }

    if (edges.length === 0) {
      const flow = current.flow + current.time * addFlow(valves, current.open);
      maxes.push(flow);
    }

    for (const { valve } of edges) {
      const steps = valves[current.node].paths[valve] + 1;

      if (current.time - steps <= 0) {
        const flow = current.flow + current.time * addFlow(valves, current.open);
        maxes.push(flow);
      } else {
        const open = new Set([...current.open]);
        open.add(valve);
        q.push({
          node: valve,
          time: current.time - steps,
          flow: current.flow + steps * addFlow(valves, current.open),
          open,
        });
      }
    }
  }

  console.log(maxes);
}

function solve_part_1() {
  const valves = getInput();

  const q = [];
  const start = {
    node: 'AA',
    time: 30,
    flow: 0,
    open: new Set(),
  };
  q.push(start);

  let maxFlow = 0;
  while (q.length > 0) {
    const current = q.shift();

    const edges = Object.values(valves).filter((v) => v.rate > 0 && !current.open.has(v.valve));

    if (edges.length === 0) {
      const flow = current.flow + current.time * addFlow(valves, current.open);
      if (flow > maxFlow) maxFlow = flow;
    }

    for (const { valve } of edges) {
      const steps = valves[current.node].paths[valve] + 1;

      if (current.time - steps <= 0) {
        const flow = current.flow + current.time * addFlow(valves, current.open);
        if (flow > maxFlow) maxFlow = flow;
      } else {
        const open = new Set([...current.open]);
        open.add(valve);
        q.push({
          node: valve,
          time: current.time - steps,
          flow: current.flow + steps * addFlow(valves, current.open),
          open,
        });
      }
    }
  }

  console.log(maxFlow);
}

function solve_part_2() {
  const valves = getInput();
  dfs(valves);
}

// solve_part_1();
solve_part_2();
