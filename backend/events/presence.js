const users = require('../models/user');

module.exports = (socket, io) => {
  var online = [];
  socket.on('online', async (id) => {
    const user = await users.findOne({ id });
    io.emit('online', [user]);
    online.push(user);
  });

  socket.on('offline', async (id) => {
    io.emit('offline', await users.findOne({ id }));
    online = online.filter((user) => user?.id === id);
  });

  io.on('connection', (socket) => socket.emit('online', online));
};
