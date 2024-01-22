const fs = require('node:fs');
const path = require('node:path');

const pathToBaseFld = path.join(__dirname, 'files');
const pathToCopyFld = path.join(__dirname, 'files-copy');

async function copyFolder(base, copy) {
  fs.mkdir(copy, { recursive: true }, (err) => {
    if (err) console.log(err);
  });

  fs.readdir(base, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);

    files.forEach((file) => {
      console.log(file.name);
      if (file.isDirectory())
        copyFolder(path.join(base, file.name), path.join(copy, file.name));
      else
        fs.copyFile(
          path.join(base, file.name),
          path.join(copy, file.name),
          (err) => {
            if (err) console.log(err);
          },
        );
    });
  });
}

fs.access(pathToCopyFld, fs.constants.F_OK, (err) => {
  if (err) console.log(3);
  else {
    fs.rm(pathToCopyFld, { force: true, recursive: true }, (err) => {
      if (err) console.log(321);
    });
  }
});

copyFolder(pathToBaseFld, pathToCopyFld);
