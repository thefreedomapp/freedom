const user = require('../models/user');

module.exports = (socket) => {
  socket.on('rmUser', async ({ email, password }, callback) => {
    callback = typeof callback === 'function' ? callback : () => {};

    if (!email || !password)
      return callback({
        message:
          'Please Provide The Account Email And Password To Remove The Account!',
        removed: false
      });

    await user.findOne(
      {
        email
      },
      async (err, data) => {
        if (!data)
          return callback({
            message: 'User Does Not Exist!',
            removed: false
          });

        if (err)
          return callback({
            message: `Internal Server Error: ${JSON.stringify(error)}`,
            changed: false
          });

        if (data.password !== password)
          return callback({
            message: 'Password Does Not Match!',
            removed: false
          });

        await data.delete();

        callback({
          message: `Successfully Removed! The Username: ${data.username} Is Now Available!`,
          removed: true
        });
      }
    );
  });
};
