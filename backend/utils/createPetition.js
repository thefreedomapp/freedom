const petition = require('../models/petition');
const nanoid = require('nanoid').nanoid;
const thread = require('../models/thread');
module.exports = (owner) => {
  const guild = new petition({
    id: nanoid(64),
    threads: {},
    owner,
    likes: 0,
    dislikes: 0 
  })

  return guild;
}