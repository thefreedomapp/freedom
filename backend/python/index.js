module.exports = (file, callback, ...args) => {
  return require('python-shell').PythonShell.run(
    'index.py',
    {
      args: [file, args.join(' ')],
      scriptPath: __dirname
    },
    (err, result) =>
      err ? require('../functions/quit')(err) : callback(result)
  );
};
