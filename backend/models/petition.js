const m = require('mongoose');
const { number } = require('prop-types');

module.exports = m.model(
  'petition',
  new m.Schema({
    id: String,
    threads: Object,
    owner: Object,
    likes: Number,
    dislikes: Number
  })
);
