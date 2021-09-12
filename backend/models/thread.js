const m = require('mongoose');

module.exports = m.model(
  'thread',
  new m.Schema({
    id: String,
    messages: Object
  })
);
