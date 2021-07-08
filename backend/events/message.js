const DOMPurify = require('dompurify')(
    new (require('jsdom').JSDOM)('<!DOCTYPE html>').window
  ).sanitize,
  marked = require('marked'),
  users = require('../models/user'),
  msg = require('../models/message'),
  newID = require('../functions/newMessage');

module.exports = async (socket, io) => {
  socket.on('message', async ({ message, id }, callback) => {
    callback = typeof callback === 'function' ? callback : () => {};

    const user = await users.findOne({
      id
    });

    if (!user)
      return callback({
        sent: false,
        message: "Please <a href='/login'>Login</a> To Send A Message!"
      });

    message = DOMPurify(marked(message));

    await msg.create({
      author: user,
      content: message,
      id: newID(1000)
    });

    io.emit('message', {
      user,
      message
    });
  });
};
