module.exports = (file, ...args) => {
  return require('python-shell').PythonShell.run(
    'index.py',
    {
      args: [file, args.join(' ')],
      scriptPath: __dirname
    },
    (err, result) =>
      err ? require('../functions/quit')(err) : console.log(result.join('\n'))
  );
};
