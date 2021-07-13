const builder = require('electron-builder'),
  // For local testing
  os =
    process.platform === 'darwin'
      ? 'MAC'
      : process.platform === 'linux'
      ? 'LINUX'
      : process.platform === 'win32'
      ? 'WINDOWS'
      : require('./backend/functions/quit')(
          new Error(
            'Unsupported Platform! Please Use Linux, Windows, Or Macos.'
          )
        ),
  Platform = builder.Platform,
  { Octokit } = require('octokit');

(async () => {
  await builder.build({
    projectDir: 'electron',
    targets: Platform[os].createTarget()
  });

  // Create release
  release(os);
})();

async function release(os) {
  var release;
  const octokit = new Octokit({
    auth: process.env.GH_TOKEN,
    userAgent: `freedom-app/v${require('./package.json').version}`
  });

  try {
    release = await octokit.rest.repos.createRelease({
      owner: 'freedom-app',
      repo: 'freedom',
      name: `v${require('./package.json').version}`,
      body: `Freedom Binary For ${os}`,
      tag_name: os
    });
  } catch (e) {}

  console.log(
    require('chalk').green(
      `\n\nCreated Release For ${os} At ${release.data.html_url}`
    )
  );
}
