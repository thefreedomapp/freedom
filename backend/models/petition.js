const m = require('mongoose');
const users = require('./user');
const thread = require('./thread');

module.exports = m.model(
  'petition',
  new m.Schema({
    id: String,
    threads: Object,
    owner: Object,
    likes: Number
  })
);
