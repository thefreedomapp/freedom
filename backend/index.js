const fs = require('fs');

require('child_process').spawnSync('npm', ['install'], {
  cwd: `${__dirname}/../`,
  shell: true
});

(async (func) => {
  // Check for environment veriables.
  // This removes the need for stdin.
  if (process.env.PORT && process.env.mongouri)
    return func({ port: process.env.PORT, mongouri: process.env.mongouri });

  if (
    // Check if the config file exists.
    // if it does, check the types of the port, and mongouri
    // If it doesn't exist, ask for the values, and store them in the config file
    !fs.existsSync(`${__dirname}/../config.json`) ||
    typeof JSON.parse(fs.readFileSync(`${__dirname}/../config.json`)).port !==
      'number' ||
    typeof JSON.parse(fs.readFileSync(`${__dirname}/../config.json`))
      .mongouri !== 'string'
  )
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

  // Run the function with the config file
  func(require('../config.json'));
})(main);

function main({ port, mongouri }) {
  const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    // Start the socket.io server
    io = new (require('socket.io').Server)(server),
    glob = require('glob').sync,
    { getRoutes } = require('get-routes'),
    cookieParser = require('cookie-parser');

  var events = [];

  // Connect to the Mongo Database
  require('./dbConnect')(mongouri);

  // Start Flask server
  require('./python')('app.py');
  console.log(
    `\nRunning Flask Server On:\n  ${
      // List the network interfaces in a green color
      // this is just cosmetic
      require('chalk').green(
        Object.values(require('os').networkInterfaces())
          .map((net) =>
            net
              .map((net) =>
                net.family === 'IPv4' ? `http://${net.address}:${port + 1}` : ''
              )
              .filter(Boolean)
          )
          .join('\n  ')
      )
    }\n`
  );

  app.use(express.json());
  app.use(cookieParser());

  // Set web routes
  glob(`${__dirname}/routes/**/*`, {
    nodir: true
  }).map((route) => require(route)(app));

  // Set socket.io events
  glob(`${__dirname}/events/**/*`, {
    nodir: true
  }).map((event) => events.push(require(event)));

  // Set the maximum event listners to Infinity
  // else we reach the max too fast
  io.setMaxListeners(Infinity);

  // On connection, run the socket.io events
  io.on('connection', (socket) => events.map((event) => event(socket, io)));

  // On a get request to /api/routes, we list the routes
  app.post('/api/routes', (req, res) => res.json(getRoutes(app)));

  server.listen(port, () =>
    console.log(
      `\nRunning On:\n  ${
        // List the network interfaces in a green color
        // this is just cosmetic
        require('chalk').green(
          Object.values(require('os').networkInterfaces())
            .map((net) =>
              net
                .map((net) =>
                  net.family === 'IPv4' ? `http://${net.address}:${port}` : ''
                )
                .filter(Boolean)
            )
            .join('\n  ')
        )
      }\n\n`
    )
  );
}
