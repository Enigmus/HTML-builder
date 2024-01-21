const fs = require('node:fs');
const path = require('node:path');
const { stdin, stdout, stderr } = process;

const secretFolder = 'secret-folder';
const currentFolder = __dirname;
const pathToSecretFolder = path.join(currentFolder, secretFolder);

fs.readdir(pathToSecretFolder, (err, files) => {
  if (err) return stdout.write(err.message);
  files.forEach((file) => {
    fs.stat(path.join(pathToSecretFolder, file), (er, st) => {
      if (st.isDirectory()) return false;
      if (err) return stdout.write(err.message);
      const objInf = path.parse(path.join(pathToSecretFolder, file));
      const name = objInf.name;
      const ext = objInf.ext.slice(1);
      const size = (+st.size / 1024).toFixed(3);
      stdout.write(`${name} - ${ext} - ${size}kb\n`);
    });
  });
});
