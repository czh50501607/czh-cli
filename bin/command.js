const program = require('commander');

const package = require('../package');

program
  .version(package.version) //  显示版本号
  .usage('<command> [options]');

program.command('list').description('显示所有模板').action(require('../lib/list'));
program.command('create').description('生成一个项目').action(require('../lib/create'));

