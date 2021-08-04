const users = require('../models/user');

module.exports = (socket) =>
  socket.on('usernameToID', async (username, callback) => {
    // If the callback is undefined, or isn't a function, make it an empty function
    callback = typeof callback === 'function' ? callback : () => {};
    // Get the user's id
    const id = (await users.findOne({ codename: username }).exec())?.userid;
    // If the id doesn't exist, return an error
    if (!id) return callback({ exists: false, message: 'Username Not Found' });
    return callback({ exists: true, id });
  });
