const user = require('../models/user');

module.exports = (socket) => {
  // On the socket event: message, run a function
  socket.on('rmUser', async ({ email, password }, callback) => {
    // If the callback is undefined, or isn't a function, make it an empty function
    callback = typeof callback === 'function' ? callback : () => {};

    // If any of the required arguments don't exist, return an error
    if (!email || !password)
      return callback({
        message:
          'Please Provide The Account Email And Password To Remove The Account!',
        removed: false
      });

    // Find a user with the provided email, then run a function with the user
    await user.findOne(
      {
        email
      },
      async (err, data) => {
        // If the user does not exist, return an error
        if (!data)
          return callback({
            message: 'User Does Not Exist!',
            removed: false
          });

        // If there is an error, return that error
        if (err)
          return callback({
            message: `Internal Server Error: ${JSON.stringify(error)}`,
            changed: false
          });

        // If the password doesn't match, return an error
        if (data.password !== password)
          return callback({
            message: 'Password Does Not Match!',
            removed: false
          });

        // If the user exists, delete the user
        await data.delete();

        // Return that the user was removed
        callback({
          message: `Successfully Removed! The Username: ${data.username} Is Now Available!`,
          removed: true
        });
      }
    );
  });
};
