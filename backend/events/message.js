const DOMPurify = require('dompurify')(
    new (require('jsdom').JSDOM)('<!DOCTYPE html>').window
  ).sanitize,
  marked = require('marked'),
  users = require('../models/user'),
  msg = require('../models/message'),
  { nanoid } = require('nanoid');

module.exports = async (socket, io) => {
  socket.on('message', async ({ message, id }, callback) => {
    callback = typeof callback === 'function' ? callback : () => {};

    var messages = [];

    const user = await users.findOne({
      id
    });

    if (!user)
      return callback({
        sent: false,
        message: "Please <a href='/login'>Login</a> To Send A Message!"
      });

    message = await msg.create({
      author: user,
      content: DOMPurify(marked(message)),
      id: nanoid(1000)
    });

    messages.push(message);

    io.on('connection', (socket) => socket.emit('message', messages));

    io.emit('message', [
      {
        user,
        message,
        id
      }
    ]);
  });
};
