const users = require('../models/user');

module.exports = (socket) =>
  socket.on('usernameToID', async (username, callback) => {
    // If the callback is undefined, or isn't a function, make it an empty function
    callback = typeof callback === 'function' ? callback : () => {};
    // Return the user's id
    callback((await users.findOne({ codename: username }).exec()).userId);
  });
