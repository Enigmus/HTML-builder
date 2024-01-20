const fs = require('node:fs');
const path = require('node:path');
const { stdin, stdout, stderr } = process;

const fileName = 'text.txt';
const pathToFile = path.join(__dirname, fileName);

const writeStream = fs.createWriteStream(pathToFile);

stdout.write('Клацай по клаве\n');

stdin.on('data', (data) => {
  if (data.toString().toLowerCase().trim() === 'exit') {
    process.exit(0);
  }
  writeStream.write(data);
});

process.on('exit', (code) => {
  if (code === 0) {
    stdout.write('Ковыляй потихоньку...');
  } else {
    stderr.write(`Фигня какая то, вот ошибка ${code}`);
  }
});

process.on('SIGINT', () => process.exit(0));
