const users = require('../models/user'),
  online = {
    onlineUsers: [],
    keepOnline: {}
  };

module.exports = (socket, io) => {
  socket.emit('online', online.onlineUsers);

  socket.on('online', async (id) => {
    const user = await users.findOne({ id });
    io.emit('online', [user]);
    online.onlineUsers.push(user);
    online.keepOnline[id]
      ? online.keepOnline[id].push([setTimeout(() => offline(user), 650)])
      : (online.keepOnline[id] = [setTimeout(() => offline(user), 650)]);
  });

  socket.on('keepOnline', (id) => {
    online.keepOnline[id]?.map((timeout) => clearTimeout(timeout));
    online.keepOnline[id]
      ? online.keepOnline[id].push(
          setTimeout(async () => offline(await users.findOne({ id })), 650)
        )
      : (online.keepOnline[id] = [
          setTimeout(async () => offline(await users.findOne({ id })), 650)
        ]);
  });

  function offline(user) {
    io.emit('offline', user);
    online.onlineUsers = online.onlineUsers.filter(
      (onlineUser) => user?.id !== onlineUser?.id
    );
    delete online.keepOnline[user?.id];
  }
};
