module.exports = (file, ...args) =>
  new Promise((resolve, reject) =>
    // Run init.py with provided arguments
    require('python-shell').PythonShell.run(
      'init.py',
      {
        args: [file, ...args],
        scriptPath: __dirname
      },
      (err, result) => (err ? reject(err) : resolve(result))
    )
  );
