module.exports = (socket, io) =>
  // On the socket event: emitToIO, emit the provided data to the io
  socket.on('emitToIO', (...data) => io.emit(...data));
