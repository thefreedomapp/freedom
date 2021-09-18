const { build, Platform } = require('electron-builder'),
  // Get system os
  os =
    process.platform === 'darwin'
      ? 'MAC'
      : process.platform === 'linux'
      ? 'LINUX'
      : process.platform === 'win32'
      ? 'WINDOWS'
      : require('../backend/utils/quit')(
          new Error(
            'Unsupported Platform! Please Use Linux, Windows, Or Macos.'
          )
        );
(async () => {
  // Build an electron
  await build({
    projectDir: 'electron',
    targets: Platform[os].createTarget()
  });
})();
