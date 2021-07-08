// Boolean value of weather we are in development mode, or not

module.exports = () =>
  process.argv[2] !== '--production' ||
  process.argv[2] !== '-p' ||
  require.main !== 'main';
