const fs = require('fs');
fs.renameSync('build/Release/C.node', 'backend/C/C.node');
fs.rmSync('build/', { recursive: true });
