const user = require('../models/user');

module.exports = (socket, io) => {
  socket.on('login', async ({ email, password }, callback) => {
    if (!email)
      return callback({
        message: 'Please Provide The Account Email!',
        logged_in: false
      });

    await user.findOne(
      {
        email
      },
      async (err, data) => {
        if (!data)
          return callback({
            message:
              "The Email Or Password Is Not Correct! Please <a href='/signup'>Signup</a> If You Do Not Have An Account",
            logged_in: false
          });

        if (err)
          return callback({
            message: `Internal Server Error: ${JSON.stringify(error)}`,
            changed: false
          });

        if (data.password !== password)
          return callback({
            message:
              "The Email Or Password Is Not Correct! Please <a href='/signup'>Signup</a> If You Do Not Have An Account",
            logged_in: false
          });

        callback({
          user: data,
          logged_in: true
        });
      }
    );
  });
};
