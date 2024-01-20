const fs = require('fs');
const path = require('path');

const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), {
  encoding: 'utf-8',
});

stream.on('readable', () => console.log(stream.read()));
stream.on('error', (error) =>
  console.log(`Фигня какая то, вот ошибка ${error}`),
);
