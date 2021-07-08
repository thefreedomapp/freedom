const m = require('mongoose');

module.exports = m.model(
  'message',
  new m.Schema({
    author: Object,
    content: String,
    id: String
  })
);
