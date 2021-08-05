const glob = require('glob').sync;
const minifier = require('@node-minify/core');
const cleanCSS = require('@node-minify/clean-css');
const babelMinify = require('@node-minify/babel-minify');
const htmlMinifier = require('@node-minify/html-minifier');
const path = require('path');

minify(null, '/backend/c/c/c/index.js');
function minify(compressor, file) {
  file = path.parse(file);

  minifier({
    compressor,
    input: `${file.dir}/${file.base}`,
    output: `${file.dir.replace('backend', 'dist')}/${file.base}`
  });
}
