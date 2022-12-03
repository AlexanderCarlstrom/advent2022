function getAllLines(file) {
  return fs.readFileSync(file, 'utf-8').split(/\r?\n/);
}

export { getAllLines }