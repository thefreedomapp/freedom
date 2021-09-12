const m = require('mongoose');

module.exports = m.model(
  'petition',
  new m.Schema({
    id: String,
    thread: Object,
    owner: Object,
    likes: Number
  })
);
