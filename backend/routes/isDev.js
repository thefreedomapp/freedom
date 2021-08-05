const isDev = require('../utils/dev')();

module.exports = (router) => {
  router.get('/api/isDev', (req, res) => res.json({ isDev }));
  return router;
};
