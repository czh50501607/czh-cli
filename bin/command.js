// 接收node 命令的 commander 插件
const program = require('commander');
// 让终端字符串变得有颜色
const chalk = require('chalk');

const package = require('../package');

program
  .version(package.version) //  显示版本号
  .usage('<command> [options]');

program.command('list').description('显示所有模板').action(require('../lib/list'));

program.command('create').alias('c').description('生成一个项目').action(require('../lib/create'));

program.command('*').description('command not found');

/**
 * help ----
 */
program.on('--help', () => {
  console.log();
  console.log(` Run ${chalk.cyan(`czh-cli <command> --help`)} for detailed usage of given command.`);
  console.log();
});


// ! 这块非常重要必写，前面是定义，这里是解析命令行里的参数
program.parse(process.argv);
