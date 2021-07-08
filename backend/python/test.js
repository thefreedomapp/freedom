// Import index.js
const run = require('.');

// Run test.py with an argument of testing, the second argument is a callback
// The callback runs after the python file runs
run('test.py', (res) => console.log(res.join('\n')), 'testing');
