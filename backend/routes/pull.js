const spawn = require('child_process').spawnSync;

module.exports = (app) => {
  app.get('/pull', async (req, res) => {
    try {
      spawn('git', ['pull'], { cwd: `${__dirname}/../../`, shell: true });
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
