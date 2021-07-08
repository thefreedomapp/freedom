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
    online.keepOnline[id]
      ? (online.keepOnline[id].onlineTimout = setTimeout(
          () => offline(user),
          650
        ))
      : (online.keepOnline[id] = {
          onlineTimout: setTimeout(() => offline(user), 650)
        });
  });

  socket.on('keepOnline', (id) => {
    clearTimeout(online.keepOnline[id]?.onlineTimout);
    clearTimeout(online.keepOnline[id]?.keepOnlineTimout);
    online.keepOnline[id]
      ? (online.keepOnline[id].keepOnlineTimout = setTimeout(
          async () => offline(await users.findOne({ id })),
          650
        ))
      : (online.keepOnline[id] = {
          keepOnlineTimout: setTimeout(
            async () => offline(await users.findOne({ id })),
            650
          )
        });
  });

  function offline(user) {
    io.emit('offline', user);
    online.onlineUsers = online.onlineUsers.filter(
      (onlineUser) => user?.id !== onlineUser?.id
    );
    delete online.keepOnline[user?.id];
  }

  io.on('connection', (socket) => socket.emit('online', online.onlineUsers));
};
