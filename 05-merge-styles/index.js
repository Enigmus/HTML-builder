const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const outFile = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(stylesFolder, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  files.forEach((file) => {
    if (file.isDirectory()) return 0;
    const fileStyle = path.join(stylesFolder, file.name);
    if (path.extname(fileStyle) === '.css') {
      fs.readFile(fileStyle, 'utf8', (err, data) => {
        if (err) console.log(err);
        fs.appendFile(outFile, data, 'utf8', () => {});
      });
    }
  });
});
