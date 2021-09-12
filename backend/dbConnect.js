const mongoose = require('mongoose');
const log = require('./utils/logging');

// Connect to the Mongo Database
module.exports = (mongouri) => {
  mongoose
    .connect(mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => log.debug(`Connected to MongoDB with a URI of: ${mongouri}`))
    .catch((err) => log.error(err));
};
