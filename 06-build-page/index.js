const fs = require('node:fs');
const path = require('node:path');

const pathToAssetsFld = path.join(__dirname, 'assets');

const pathToDistFld = path.join(__dirname, 'project-dist');
const pathToCopyAssetsFld = path.join(pathToDistFld, 'assets');

const stylesFolder = path.join(__dirname, 'styles');
const pathToBundle = path.join(pathToDistFld, 'style.css');

const pathToTemplate = path.join(__dirname, 'template.html');
const pathToComponents = path.join(__dirname, 'components');
const pathToIndex = path.join(pathToDistFld, 'index.html');

let templ = '';

function copyFolder(base, copy) {
  fs.mkdir(copy, { recursive: true }, (err) => {
    if (err) console.log(err);
  });

  fs.readdir(base, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);

    files.forEach((file) => {
      if (file.isDirectory()) {
        copyFolder(path.join(base, file.name), path.join(copy, file.name));
      } else
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

fs.access(pathToDistFld, (err) => {
  if (err) {
    fs.mkdir(pathToDistFld, { recursive: true }, (err) => {
      if (err) console.log(err);
    });
    copyFolder(pathToAssetsFld, pathToCopyAssetsFld);
  } else {
    fs.rm(pathToCopyAssetsFld, { recursive: true }, (err) => {
      if (err) console.log(err);
      fs.mkdir(pathToDistFld, { recursive: true }, (err) => {
        if (err) console.log(err);
      });
      copyFolder(pathToAssetsFld, pathToCopyAssetsFld);
    });
  }
});

fs.access(pathToBundle, (err) => {
  if (err) return 0;
  else {
    fs.unlink(pathToBundle, (err) => {
      if (err) console.log(err);
    });
  }
});

fs.readdir(stylesFolder, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  files.forEach((file) => {
    if (file.isDirectory()) return 0;
    const fileStyle = path.join(stylesFolder, file.name);
    if (path.extname(fileStyle) === '.css') {
      fs.readFile(fileStyle, 'utf8', (err, data) => {
        if (err) console.log(err);
        fs.appendFile(pathToBundle, data, 'utf8', () => {});
      });
    }
  });
});

fs.readFile(pathToTemplate, 'utf-8', (err, data) => {
  if (err) console.log(err);
  templ += data;

  fs.readdir(pathToComponents, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);

    files.forEach(function (file) {
      if (!file.isDirectory() && path.extname(file.name).slice(1) === 'html') {
        fs.readFile(
          path.join(pathToComponents, file.name),
          'utf-8',
          (err, data) => {
            if (err) console.log(err);
            templ = templ.replaceAll(`{{${path.parse(file.name).name}}}`, data);
            fs.writeFile(pathToIndex, templ, { encoding: 'utf-8' }, (err) => {
              if (err) console.log(err);
            });
          },
        );
      } else {
        return 0;
      }
    });
  });
});
