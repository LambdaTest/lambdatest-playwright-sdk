const fs = require('fs');
const path = require('path');

function getSmartUIServerAddress() {
  return process.env.SMARTUI_SERVER_ADDRESS || 'http://localhost:8080';
}
function getPackageName() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8')).name;
}
module.exports = {
  getSmartUIServerAddress,
  getPackageName,
};
