const path = require('path');
const fs = require('fs');

module.exports = () => {
  const tmplDir = path.join(__dirname, '../templates');
  fs.readdir(tmplDir, (err, files) => {
    console.log('\n');
    console.log('// ----------- 可供使用的模版 ----------- // \n');
    console.table(files);
    console.log('\n');
  });
};
