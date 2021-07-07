const user = require('../models/user');

module.exports = (socket) => {
  socket.on(
    'changeUsername',
    async ({ email, password, newUsername }, callback) => {
      callback = typeof callback === 'function' ? callback : () => {};

      if (!email || !password)
        return callback({
          message:
            'Please Provide The Account Email And Password To Change The Password!',
          changed: false
        });

      await user.findOne(
        {
          email
        },
        async (err, data) => {
          if (!data)
            return callback({
              message: 'The Provided User Does Not Exist!',
              changed: false
            });

          if (err)
            return callback({
              message: `Internal Server Error: ${JSON.stringify(error)}`,
              changed: false
            });

          if (data.password !== password)
            return callback({
              message: 'Password Does Not Match!',
              changed: false
            });

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
