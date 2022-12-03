const fileContents = fs.readFileSync('input.txt', 'utf-8');
let elves = [];
let sum = 0
const arr = fileContents.split(/\r?\n/);
arr.forEach((line, i) =>  {
  if (line === '') {
    elves.push(sum);
    sum = 0;
  } else {
    sum += parseInt(line)

    if (i === arr.length - 1) {
      elves.push(sum);
    }
  }
});

console.log(elves);
let newSum = 0;
for (let i = 0; i < 3; i++) {
  const value = Math.max(...elves);
  const index = elves.indexOf(value);
  elves.splice(index, 1);
  newSum += value;
  console.log(elves);
}

console.log(newSum)