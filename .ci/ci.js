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
  Platform = builder.Platform,
  deleteTagAndRelease = require('delete-tag-and-release'),
  { Octokit } = require('octokit');

(async () => {
  // Build an electron
  await builder.build({
    projectDir: 'electron',
    targets: Platform[os].createTarget()
  });

  // Create release
  release(os);
})();

async function release(os) {
  let release;
  // Setup Octokit with the GitHub token
  const octokit = new Octokit({
    auth: process.env.GH_TOKEN,
    userAgent: `freedom-app/v${require('../package.json').version}`
  });

  // Delete the release
  deleteTagAndRelease({
    GITHUB_REPOSITORY: 'freedom-app/freedom',
    TAG_NAME: os,
    GITHUB_TOKEN: process.env.GH_TOKEN
  });

  // Create the release, and tag
  release = await octokit.rest.repos.createRelease({
    owner: 'freedom-app',
    repo: 'freedom',
    name: `v${require('../package.json').version}`,
    body: `Freedom Binary For ${os}`,
    tag_name: os
  });

  // Log the release URL
  console.log(
    require('chalk').green(
      `\n\nCreated Release For ${os} At ${release.data.html_url}`
    )
  );
}
