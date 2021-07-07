module.exports = (app) => {
  !(
    process.argv[2] === '--production' ||
    process.argv[2] === '-p' ||
    require.main !== 'main'
  ) ||
    console.log(
      require('chalk').red(
        require('child_process').spawnSync('npm', ['run', 'build'], {
          cwd: `${__dirname}/../../`,
          shell: true,
          encoding: 'utf8'
        }).stderr
      )
    );

  const next = require('next')({
    dev: !(
      process.argv[2] === '--production' ||
      process.argv[2] === '-p' ||
      require.main !== 'main'
    ),
    dir: `${__dirname}/../../frontend`
  });

  next.prepare().then(() => {
    app.get('*', next.getRequestHandler());
  });
};
