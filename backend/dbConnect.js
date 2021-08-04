const mongoose = require('mongoose');
const log = require('./utils/logging');

// Connect to the Mongo Database
module.exports = (mongouri) => {
  mongoose.set('useCreateIndex', true);

  mongoose
    .connect(mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => log.debug(`Connected to MongoDB with a URI of: ${mongouri}`))
    .catch((err) => log.error(err));
};
