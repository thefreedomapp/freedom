module.exports = (socket, io) =>
  socket.on('emitToIO', (...data) => io.emit(...data));
