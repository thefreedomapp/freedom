const m = require('mongoose');

// Create a message schema
module.exports = m.model(
  'message',
  new m.Schema({
    author: Object,
    content: String,
    id: String,
    thread: Object
  })
);
