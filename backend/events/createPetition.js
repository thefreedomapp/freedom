const petition = require('../models/petition');
const nanoid = require('nanoid').nanoid;
const thread = require('../models/thread');
const users = require('../models/user');
const log = require('../utils/logging');

module.exports = (socket) => {
  socket.on('createPetition', (id) => {
    const user = users.findOne({ id });

    new petition({
      id: nanoid(64),
      threads: {
        general: new thread({
          id: nanoid(64),
          messages: []
        })
      },
      owner: user,
      likes: 0
    });

    log.info(`New Petition Created By ${user.codename}`);
  });
};
