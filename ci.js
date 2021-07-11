const builder = require('electron-builder');
if (process.env.TRAVIS_OS_NAME === 'osx')
  builder.build({
    projectDir: 'electron',
    targets: ['macos']
  });
else
  builder.build({
    projectDir: 'electron',
    targets: [process.env.TRAVIS_OS_NAME]
  });

console.log(require('glob').sync(`${__dirname}/electron`).join('\n'));
