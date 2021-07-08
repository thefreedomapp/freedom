const spawn = require('child_process').spawnSync;

// On a get request to /pull, pull from the git repository
// I really don't know why you need that comment...
// Meh, its more documentation...
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
