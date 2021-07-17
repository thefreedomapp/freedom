const users = require('../models/user'),
  online = {
    onlineUsers: [],
    keepOnline: {}
  };

module.exports = (socket, io) => {
  // On connection emit the online event to the socket, with the online users as the data
  socket.emit('online', online.onlineUsers);

  // On the socket event: online, run a function
  socket.on('online', async (id) => {
    // Find a user with the provided id
    const user = await users.findOne({ id });
    // Emit the online event to every connected socket, other than this one
    socket.broadcast.emit('online', [user]);
    // Push the online user to the list of online users
    online.onlineUsers.push(user);
    // If the user's id is in the keepOnline object, and it is an array,
    // push a timeout that runs the offline function to it,
    // if it is not an array,
    // make it an array with a timeout that runs the offline function
    typeof online.keepOnline[id] === 'array'
      ? online.keepOnline[id].push(setTimeout(() => offline(user), 650))
      : (online.keepOnline[id] = [setTimeout(() => offline(user), 650)]);
  });

  // On the socket event: keepOnline, run a function
  socket.on('keepOnline', (id) => {
    // Go through every offline timout, and clear it
    online.keepOnline[id]?.map((timeout) => clearTimeout(timeout));
    // If the user's id is in the keepOnline object, and it is an array,
    // push a timeout that runs the offline function to it,
    // if it is not an array,
    // make it an array with a timeout that runs the offline function
    typeof online.keepOnline[id] === 'array'
      ? online.keepOnline[id].push(
          setTimeout(async () => offline(await users.findOne({ id })), 650)
        )
      : (online.keepOnline[id] = [
          setTimeout(async () => offline(await users.findOne({ id })), 650)
        ]);
  });

  function offline(user) {
    // Emit the offline event to all connected sockets, with the provided user as the data
    io.emit('offline', user);
    // Remove the user from the list of online users
    online.onlineUsers = online.onlineUsers.filter(
      (onlineUser) => user?.id !== onlineUser?.id
    );
    delete online.keepOnline[user?.id];
  }
};
