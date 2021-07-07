const users = require('../models/user');

module.exports = (socket, io) => {
  const online = {
    onlineUsers: [],
    keepOnline: {}
  };

  socket.on('online', async (id) => {
    const user = await users.findOne({ id });
    io.emit('online', [user]);
    online.onlineUsers.push(user);
    online.keepOnline[id] = setTimeout(offline, 6000, user);
  });

  socket.on('keepOnline', async (id) => {
    clearTimeout(online.keepOnline[id]);
  });
  function offline(user) {
    io.emit('offline', user);
    online.onlineUsers = online.onlineUsers.filter(
      (onlineUser) => user?.id === onlineUser?.id
    );
    delete online.keepOnline[user?.id];
  }

  io.on('connection', (socket) => socket.emit('online', online.onlineUsers));
};
