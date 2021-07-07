const spawn = require('child_process').spawnSync,
  deps = Object.keys(require('./package.json').dependencies);

deps.map((dep) => {
  if (dep.startsWith('@types/')) return;
  const line = spawn('npm', ['install', `@types/${dep}`], {
    shell: true,
    cwd: __dirname,
    encoding: 'utf8'
  }).stderr.split('\n')[0];

  line.includes('npm WARN deprecated @types/')
    ? spawn('npm', ['uninstall', `@types/${dep}`], {
        shell: true,
        cwd: __dirname,
        encoding: 'utf8'
      })
    : line.includes('npm ERR! code E404')
    ? console.log(`@types/${dep} Does Not Exist!`)
    : console.log(`Installed @types/${dep}`);
});
