const fs = require('fs');
fs.renameSync('build/Release/C.node', 'backend/C/C.node');
fs.rmSync('build/', { recursive: true });
if (fs.existsSync('frontend/styles/bulma.min.css'))
  fs.rmSync('frontend/styles/bulma.min.css');
fs.copyFileSync(
  'node_modules/bulma/css/bulma.min.css',
  'frontend/styles/bulma.min.css'
);
