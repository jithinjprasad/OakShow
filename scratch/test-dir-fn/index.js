const fs = require('fs');
const path = require('path');

exports.handler = async function(event) {
  const dirFiles = fs.readdirSync(__dirname);
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Directory deploy works!',
      dirname: __dirname,
      cwd: process.cwd(),
      files: dirFiles
    })
  };
};
