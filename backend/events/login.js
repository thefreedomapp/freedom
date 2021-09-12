const user = require('../models/user');

module.exports = (socket) => {
  // On the socket event: login, run a function
  socket.once('login', async ({ email, password }, callback) => {
    // If the callback is undefined, or isn't a function, make it an empty function
    callback = typeof callback === 'function' ? callback : () => {};

    // If any of the required arguments don't exist, return an error
    if (!email || !password)
      return callback({
        message: 'Please Provide The Account Email!',
        logged_in: false
      });

    // Find a user with the provided email
    await user.findOne(
      {
        email
      },
      async (err, data) => {
        // If the user doesn't exist, return an error
        if (!data)
          return callback({
            message:
              "The Email Or Password Is Not Correct! Please <a href='/signup'>Signup</a> If You Do Not Have An Account",
            logged_in: false
          });

        // If there is an error, return that error
        if (err)
          return callback({
            message: `Internal Server Error: ${JSON.stringify(error)}`,
            logged_in: false
          });

        // If the provided password doesn't match the user's password, return an error
        if (data.password !== password)
          return callback({
            message:
              "The Email Or Password Is Not Correct! Please <a href='/signup'>Signup</a> If You Do Not Have An Account",
            logged_in: false
          });

        // Return that the user has the correct data, and provide the user data
        callback({
          user: data,
          logged_in: true
        });
      }
    );
  });
};
