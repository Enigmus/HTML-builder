const fs = require('node:fs');
const path = require('node:path');
const { stdout } = process;

const pathToFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFolder, (err, files) => {
  if (err) return stdout.write(err.message);

  files.forEach((file) => {
    const pathToFile = path.join(pathToFolder, file);
    fs.stat(pathToFile, (err, st) => {
      if (st.isDirectory()) return false;
      if (err) return stdout.write(err.message);

      const objInf = path.parse(pathToFile);
      stdout.write(
        `${objInf.name} - ${objInf.ext.slice(1)} - ${(st.size / 1024).toFixed(
          3,
        )}kb\n`,
      );
    });
  });
});
