const m = require('mongoose');

// Create a user schema
module.exports = m.model(
  'user',
  new m.Schema({
    name: String,
    identifier: String,
    username: String,
    codeName: String,
    email: String,
    password: String,
    pfp: String,
    id: String
  })
);
