const spawn = require('child_process').spawnSync;
const log = require('../utils/logging');

// On a get request to /pull, pull from the git repository
// I really don't know why you need that comment...
// Meh, its more documentation...
module.exports = (app) => {
  app.get('/pull', async (req, res) => {
    var pulled;

    try {
      pulled = spawn('git', ['pull'], {
        cwd: `${__dirname}/../../`,
        shell: true,
        encoding: 'utf-8'
      });
    } catch (error) {
      log.error(`Error Pulling From Git! ${error}`);
      return res.json({
        pulled: false,
        error
      });
    }

    if (!pulled.stdout.includes('Already up to date'))
      log.info(
        `Pulled From Git! Commit Hash: ${pulled.stdout.match(
          /\b[0-9a-f]{5,40}\b/
        )}`
      );
    else log.info('No Commits To Pull!');

    return res.json({
      pulled: true
    });
  });
};
