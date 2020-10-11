module.exports = () => {
  const templates = require('../templates/templates.json');
  console.log('\n');
  console.log('// ----------- 可供使用的模版 ----------- // \n');
  console.table(templates);
  console.log('\n');
};
