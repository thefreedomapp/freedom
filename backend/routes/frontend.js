const dev = require('../utils/dev')();

module.exports = (app) => {
  dev ||
    console.log(
      // Build so that Next doesn't whine that there is no build
      require('chalk').red(
        require('child_process').spawnSync('npm', ['run', 'build'], {
          cwd: `${__dirname}/../../`,
          shell: true,
          encoding: 'utf8'
        }).stderr
      )
    );

  const next = require('next')({
    dev: dev,
    dir: `${__dirname}/../../frontend`
  });

  // On every get request, use the Next request handler, for the frontend
  next.prepare().then(() => app.get('*', next.getRequestHandler()));
};
