const { nanoid } = require('nanoid');

function newID(size) {
  if (size !== Number) return console.log("Size doesn't seem to be a number.");

  return nanoid(size);
}

module.exports = newID;
