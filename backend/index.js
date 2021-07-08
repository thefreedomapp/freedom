const fs = require('fs');

require('child_process').spawnSync('npm', ['install'], {
  cwd: `${__dirname}/../`,
  shell: true
});
(async (func) => {
  if (!fs.existsSync(`${__dirname}/../config.json`))
    fs.writeFileSync(
      `${__dirname}/../config.json`,
      JSON.stringify(
        await require('prompts')([
          {
            type: 'number',
            name: 'port',
            message: 'Port:'
          },
          {
            type: 'text',
            name: 'mongouri',
            message: 'MongoDB URI:'
          }
        ])
      )
    );

  func(require('../config.json'));
})(main);

function main({ port, mongouri }) {
  const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = new (require('socket.io').Server)(server),
    glob = require('glob').sync,
    { getRoutes } = require('get-routes'),
    cookieParser = require('cookie-parser');

  var events = [];

  require('./dbConnect')(mongouri);

  app.use(express.json());
  app.use(cookieParser());

  // Set routes
  glob(`${__dirname}/routes/**/*`, {
    nodir: true
  }).map((route) => require(route)(app));

  // Set events
  glob(`${__dirname}/events/**/*`, {
    nodir: true
  }).map((event) => events.push(require(event)));

  io.setMaxListeners(30);
  io.on('connection', (socket) => events.map((event) => event(socket, io)));

  app.post('/api/routes', (req, res) => res.json(getRoutes(app)));

  server.listen(port || 8080, () =>
    console.log(
      `Running On:\n  ${require('chalk').green(
        Object.values(require('os').networkInterfaces())
          .map((net) =>
            net
              .map((net) =>
                net.family === 'IPv4'
                  ? `http://${net.address}:${port || 8080}`
                  : ''
              )
              .filter(Boolean)
          )
          .join('\n  ')
      )}`
    )
  );
}
