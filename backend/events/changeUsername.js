const user = require('../models/user');

module.exports = (socket) => {
  // On the socket event: changeUsername, run a function
  socket.on(
    'changeUsername',
    async ({ email, password, newUsername }, callback) => {
      // If the callback is undefined, or isn't a function, make it an empty function
      callback = typeof callback === 'function' ? callback : () => {};

      // If any of the required arguments don't exist, return an error
      if (!email || !password || !newUsername)
        return callback({
          message:
            'Please Provide The Account Email And Password To Change The Password!',
          changed: false
        });

      // Find a user with the email
      await user.findOne(
        {
          email
        },
        async (err, data) => {
          // If the user doesn't exist, return an error
          if (!data)
            return callback({
              message: 'The Provided User Does Not Exist!',
              changed: false
            });

          // If there is an error, return that error
          if (err)
            return callback({
              message: `Internal Server Error: ${JSON.stringify(error)}`,
              changed: false
            });

          // If the provided password doesn't match the provided password, return an error
          if (data.password !== password)
            return callback({
              message: 'Password Does Not Match!',
              changed: false
            });

          // If the user exists, and the password matches, change the username
          await user.findOne(
            {
              email
            },
            {
              $set: {
                username: newUsername
              }
            }
          );

          callback({
            changed: true
          });
        }
      );
    }
  );
};
