const DOMPurify = require('dompurify')(
    new (require('jsdom').JSDOM)('<!DOCTYPE html>').window
  ).sanitize,
  marked = require('marked'),
  users = require('../models/user');

module.exports = (socket, io) => {
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

    io.emit('message', {
      user,
      message: DOMPurify(marked(message))
    });
  });
};
