const users = require('../models/user'),
  { nanoid } = require('nanoid');

module.exports = (socket) => {
  socket.on(
    'signUp',
    async ({ email, password, username, name, pfp }, callback) => {
      callback = typeof callback === 'function' ? callback : () => {};

      if (
        name === undefined ||
        username === undefined ||
        email === undefined ||
        password === undefined ||
        pfp === undefined
      )
        return callback({
          message: 'Missing Required Arguments!',
          created: false
        });

      await users.findOne(
        {
          email
        },
        async (err, data) => {
          if (data)
            return callback({
              message: `Email Is Already Connected To An Account!`,
              created: false
            });

          if (err)
            return callback({
              message: err,
              created: false
            });

          if (!data)
            callback({
              message: 'User Successfully Created.',
              created: true,
              user: await users.create({
                name,
                username,
                email,
                password,
                pfp,
                id: nanoid(100)
              })
            });
        }
      );
    }
  );
};
