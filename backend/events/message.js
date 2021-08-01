const DOMPurify = require('dompurify')(
    new (require('jsdom').JSDOM)('<!DOCTYPE html>').window
  ).sanitize,
  marked = require('marked'),
  users = require('../models/user'),
  msg = require('../models/message'),
  { nanoid } = require('nanoid');

module.exports = async (socket, io) => {
  // On connection emit the message event to the socket, with all messages sent as the data
  socket.emit('message', await msg.find({}).exec());

  // On the socket event: message, run a function
  socket.on('message', async ({ message, id }, callback) => {
    // If the callback is undefined, or isn't a function, make it an empty function
    callback = typeof callback === 'function' ? callback : () => {};

    // Find a user with the provided id
    const user = await users.findOne({
      id
    });

    // If the user doesn't exist, return an error
    if (!user)
      return callback("Please <a href='/login'>Login</a> To Send A Message!");

    // Create a message object
    message = await msg.create({
      author: {
        username: user.username,
        codename: user.codename,
        userId: user.userId
      },
      content: DOMPurify(marked(message)),
      id: nanoid(1000)
    });

    // Emit the message to all connected sockets
    io.emit('message', [message]);
  });
};
