const mongoose = require('mongoose');

// Connect to the Mongo Database
module.exports = (mongouri) => {
  mongoose.set('useCreateIndex', true);

  mongoose
    .connect(mongouri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(() => {
      console.log(`Connected to MongoDB with a URI of: ${mongouri}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
