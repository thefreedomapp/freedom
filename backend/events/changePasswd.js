const user = require('../models/user');

module.exports = (socket) => {
  // On the socket event: changePasswd, run a function
  socket.on('changePasswd', async ({ email, password }, callback) => {
    // If the callback is undefined, or isn't a function, make it an empty function
    callback = typeof callback === 'function' ? callback : () => {};

    // If there is no email, return an error
    if (!email)
      return callback({
        message: 'Please Provide The Email!',
        changed: false
      });

    // Find a user with the email provided, then run a function with that user
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

        // If the password doesn't match, return an error
        if (data.password !== password)
          return callback({
            message: 'Password Does Not Match!',
            changed: false
          });

        // If there are no errors, set the password to the provided password
        await user.findOne(
          {
            email
          },
          {
            $set: {
              password
            }
          }
        );

        // Return that the password was changed
        callback({
          changed: true
        });
      }
    );
  });
};
