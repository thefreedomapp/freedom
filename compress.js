const minifier = require('@node-minify/core');
const terser = require('@node-minify/terser');
const glob = require('glob').sync;
const fs = require('fs');
const path = require('path');
const log = require('./backend/utils/logging');

if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
  fs.mkdirSync('dist');
} else fs.mkdirSync('dist');

glob('backend/**/*', { nodir: true, ignore: ['backend/**/*.js'] }).map(
  (file) => {
    fs.mkdirSync(path.dirname(file).replace('backend', 'dist'), {
      recursive: true
    });

    fs.copyFileSync(file, file.replace('backend', 'dist'));
  }
);

glob('backend/**/*.js', { nodir: true }).map((file) => {
  fs.mkdirSync(path.dirname(file).replace('backend', 'dist'), {
    recursive: true
  });
  log.info(`${file} --> ${file.replace('backend', 'dist')}`);
  minifier({
    compressor: terser,
    input: file,
    output: file.replace('backend', 'dist')
  });
});
