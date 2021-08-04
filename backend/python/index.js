module.exports = (file, callback, options, ...args) =>
  // Run init.py with provided arguments
  require('python-shell').PythonShell.run(
    'init.py',
    {
      ...options,
      args: [file, ...args],
      scriptPath: __dirname
    },
    (err, result) =>
      err
        ? require('../utils/quit')(err)
        : typeof callback === 'function'
        ? callback(result)
        : ''
  );
