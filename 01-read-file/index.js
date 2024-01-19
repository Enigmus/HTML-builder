const fs = require('fs');
const path = require('path');
const { stdout } = process;
let pathToFileText = path.join(__dirname, 'text.txt');

let stream = fs.createReadStream(pathToFileText, { encoding: 'utf-8' });

stream.on('readable', function () {
  var data = stream.read();
  console.log(data);
});
