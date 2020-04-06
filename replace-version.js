const fs = require('fs');
const childProcess = require('child_process');

const lastCommit = childProcess.execSync('git log -1 --format="%at"', {encoding: 'utf8'});

const userscript = fs.readFileSync('./dist/index.user.js', {encoding: 'utf8'});
fs.writeFileSync(
  './dist/index.user.js', 
  userscript.replace('0.0.0-dev', '0.0.' + lastCommit.trim()), 
  {encoding: 'utf8'}
);