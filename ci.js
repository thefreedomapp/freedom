const builder = require('electron-builder'),
  // For local testing
  os = process.env.TRAVIS_OS_NAME ?? process.platform,
  Platform = builder.Platform;

(async () => {
  // If the os is Macos run the builder in Macos mode
  if (os === 'osx')
    await builder.build({
      projectDir: 'electron',
      targets: Platform.MAC.createTarget()
    });
  // If the os is Windows run the builder in Windows mode
  else if (os === 'win32' || os === 'windows')
    await builder.build({
      projectDir: 'electron',
      targets: Platform.WINDOWS.createTarget()
    });
  // If the os is linux run the builder in Linux mode
  else if (os === 'linux')
    await builder.build({
      projectDir: 'electron',
      targets: Platform.LINUX.createTarget()
    });
  // If the os is unsupoported (such as FreeBSD, etc...) say the supported oses
  else throw 'Unsupported Platform! Please Use Linux, Windows, Or Macos.';

  // Create release
  release(os);
})();

function release(os) {
  const options = {
    tag_name: os,
    target_commitish: 'master',
    name: `v${require('./package.json').version}`,
    body: `Freedom installation binary for ${os}\n`,
    draft: false,
    prerelease: false,
    repo: 'freedom',
    owner: 'freedom-app',
    assets: require('glob')
      .sync(`electron/dist/freedom-app*`)
      .filter((asset) => !asset.endsWith('.blockmap')),
    endpoint: 'https://api.github.com',
    auth: { token: process.env.GH_TOKEN },
    yes: true
  };

  require('gh-release')(options, (err, result) =>
    err
      ? require('./backend/functions/quit')(err)
      : console.log(
          require('chalk').green(`Created Release At ${result.html_url}`)
        )
  );
}
