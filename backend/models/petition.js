const m = require('mongoose');

module.exports = m.model(
  'petition',
  new m.Schema({
    id: String,
    threads: Object,
    owner: Object
  })
);
