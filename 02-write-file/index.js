const fs = require('node:fs');
const path = require('node:path');
const { stdin, stdout, stderr } = process;

const { Buffer } = require('node:buffer');

const fileName = 'text.txt';
const pathToFile = path.join(__dirname, fileName);

const writeStream = fs.createWriteStream(pathToFile);

stdout.write('Клацая по клаве\n');

stdin.on('data', (data) => {
  //console.log(typeof data.toString());
  //if (data.toString().) {
  //stdout.write(data.toString().toUpperCase());
  // process.exit(0);
  //}
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

/* const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf-8',
});

stream.on('readable', () => console.log(stream.read()));
stream.on('error', (error) =>
  console.log(`Фигня какая то, вот ошибка ${error}`),
); */
