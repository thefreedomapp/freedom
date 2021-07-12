const builder = require('electron-builder'),
  // For local testing
  os = process.env.TRAVIS_OS_NAME ?? process.platform,
  Platform = builder.Platform;

// If the os is Macos run the builder in Macos mode
if (os === 'osx')
  builder.build({
    projectDir: 'electron',
    targets: Platform.MAC.createTarget(builder.DIR_TARGET)
  });
// If the os is Windows run the builder in Windows mode
else if (os === 'win32' || os === 'windows')
  builder.build({
    projectDir: 'electron',
    targets: Platform.WINDOWS.createTarget(builder.DIR_TARGET)
  });
// If the os is linux run the builder in Linux mode
else if (os === 'linux')
  builder.build({
    projectDir: 'electron',
    targets: Platform.LINUX.createTarget(builder.DIR_TARGET)
  });
// If the os is unsupoported (such as FreeBSD, etc...) say the supported oses
else throw 'Unsupported Platform! Please Use Linux, Windows, Or Macos.';

console.log(require('glob').sync(`${__dirname}/electron/dist`).join('\n'));
