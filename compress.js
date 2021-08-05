const minifier = require('@node-minify/core');
const babelMinify = require('@node-minify/babel-minify');
const path = require('path');
  minifier({
    babelMinify,
    input: 'backend/**/*.js',
    output: 'dist/$1.js'
  });
