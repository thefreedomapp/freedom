// This file is a WIP, as such, there are no comments right now
const ss = require('socket.io-stream');

module.exports = (socket) => {
  ss(socket).on('vc-stream', (stream, data) => {
    console.log(typeof stream, '\n', data);
  });
};
