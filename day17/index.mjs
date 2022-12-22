import { readFileSync } from 'node:fs';
import _ from 'lodash';

const input = readFileSync('day17/fake.txt', { encoding: 'utf-8' }).trim().split('');
const map = [];

function createRock(rock) {
  if (rock === 0) {
    return { x: 2, y: 0, width: 3, height: 0, type: rock };
  }
  if (rock === 1) {
    return { x: 2, y: 0, width: 2, height: 2, type: rock };
  }
  if (rock === 2) {
    return { x: 2, y: 0, width: 2, height: 2, type: rock };
  }
  if (rock === 3) {
    return { x: 2, y: 0, width: 0, height: 3, type: rock };
  }
  if (rock === 4) {
    return { x: 2, y: 0, width: 1, height: 1, type: rock };
  }
  console.log(1);
}

function goLeft(rock) {
  if (rock.x === 0) return;
  rock.x--;
}

function goRight(rock) {
  if (rock.x + rock.width === 6) return;
  rock.x++;
}

function lastSteps(rock) {
  let stop = false;

  const y = rock.y + rock.height + 1;
  const max = rock.x + rock.width;
  for (let x = rock.x; x <= max; x++) {
    if (map[y][x] === '#') {
      stop = true;
      break;
    }
  }

  if (stop && rock.type == 1) {
    return map[y][rock.x + 1] === '#';
  }
  return stop;
}

function paintRock(rock, rockY) {
  if (rock.type === 1) {
    if (map[rockY][rock.x] !== '#') map[rockY][rock.x] = '0';
    if (map[rockY][rock.x + rock.width] !== '#') map[rockY][rock.x + rock.width] = '0';
    if (map[rockY + rock.height][rock.x] !== '#') map[rockY + rock.height][rock.x] = '0';
    if (map[rockY + rock.height][rock.x + rock.width] !== '#') map[rockY + rock.height][rock.x + rock.width] = '0';
  }
  if (rock.type === 2) {
    if (map[rockY][rock.x] !== '#') map[rockY][rock.x] = '0';
    if (map[rockY][rock.x + 1] !== '#') map[rockY][rock.x + 1] = '0';
    if (map[rockY + 1][rock.x] !== '#') map[rockY + 1][rock.x] = '0';
    if (map[rockY + 1][rock.x + 1] !== '#') map[rockY + 1][rock.x + 1] = '0';
  }

  for (let y = rockY; y <= rockY + rock.height; y++) {
    for (let x = rock.x; x <= rock.x + rock.width; x++) {
      if (map[y][x] === '0') {
        map[y][x] = '.';
      } else {
        map[y][x] = '#';
      }
    }
  }
}

function drawMap() {
  map.forEach((line) => {
    console.log(line.join(''));
  });
}

function solve_part_1() {
  const rockCount = 2022;

  for (let i = 0; i < rockCount * 2; i++) {
    map.push(['.', '.', '.', '.', '.', '.', '.']);
  }

  // console.log(map);

  const rocks = [];
  let rockNum = 0;
  let last = map.length - 5;
  let printY = map.length - 1;
  for (let i = 0; i < 5; i++) {
    const rock = createRock(rockNum);
    let stopped = false;

    for (let j = 0; j < input.length; j++) {
      // Move vertically
      const y = rock.y + rock.height;
      if (y >= last - 1) {
        if (lastSteps(rock)) {
          paintRock(rock);
          stopped = true;
          break;
        }
      }
      rock.y++;

      // Move horizontally
      if (input[j] === '<') goLeft(rock);
      else if (input[j] === '>') goRight(rock);
    }

    if (!stopped) {
      paintRock(rock, printY);
    }
    last = rock.y;
    console.log(last);
    rocks.push(rock);
    rockNum++;
    if (rockNum === 5) rockNum = 0;
  }
  console.log(map.length - last);
  drawMap();
}

function solve_part_2() {}

solve_part_1();
// solve_part_2();
