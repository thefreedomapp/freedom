const builder = require('electron-builder'),
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
        ),
  Platform = builder.Platform;
(async () => {
  // Build an electron
  await builder.build({
    projectDir: 'electron',
    targets: Platform[os].createTarget()
  });
})();
