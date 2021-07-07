const m = require('mongoose');

module.exports = m.model(
  'user',
  new m.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    pfp: String,
    id: String
  })
);
