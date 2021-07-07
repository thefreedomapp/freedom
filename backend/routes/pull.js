const spawn = require('child_process').spawnSync,
  spawnOpts = { cwd: `${__dirname}/../../`, shell: true };

module.exports = (app) => {
  app.get('/pull', async (req, res) => {
    try {
      spawn('git', ['pull'], spawnOpts);
      spawn('git', ['submodule', 'update'], spawnOpts);
    } catch (error) {
      res.json({
        pulled: false,
        error
      });
    }

    return res.json({
      pulled: true
    });
  });
};
