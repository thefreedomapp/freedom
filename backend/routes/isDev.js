const isDev = require('../utils/dev');

module.exports = (app) => {
  app.get('/api/isDev', (req, res) => res.json({ isDev }));
};
