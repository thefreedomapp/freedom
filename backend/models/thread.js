const m = require('mongoose');
const petitions = require('./petition');

module.exports = m.model(
  'thread',
  new m.Schema({
    id: String,
    messages: Object,
    petition: petitions
  })
);
