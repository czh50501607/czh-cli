// 通过命令行询问用户问题
// 根据用户回答的结果生成文件
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const ejs = require('ejs');

const { TemplateTypePrompt } = require('./prompts');
const { loading, download } = require('./utils');

const templates = require('../templates/templates.json');

module.exports = () => {
  // 问问题
  inquirer.prompt(TemplateTypePrompt(templates)).then(async (answers) => {
    // 根据用户回答生成文件
    const { appName, type } = answers;

    // const tmplDir = path.join(__dirname, '../templates', type);
    // const destDir = name; //path.join(__dirname, name);

    const templateInfo = templates.find((t) => t.type === type);

    if (!templateInfo) {
      console.log('没有你想要的模版');
      return;
    }
    const { author, name } = templateInfo;

    await loading(download, {
      waitting: 'fetching template...',
      succeed: 'fetch package succeed! 😁',
      fail: 'oH? What`s wrong with this? 😅'
    })(`${author}/${name}`, appName);

    // try {
    //   fs.readdir(tmplDir, (err, files) => {
    //     if (err) {
    //       throw new Error(err);
    //     }
    //     // recursive 递归
    //     fs.mkdir(name, { recursive: true }, (err) => {
    //       if (err) {
    //         throw new Error(err);
    //       }
    //       files.forEach((file) => {
    //         ejs.renderFile(path.join(tmplDir, file), answers, (err, result) => {
    //           if (err) {
    //             throw new Error(err);
    //           }
    //           fs.writeFileSync(path.join(destDir, file), result);
    //         });
    //       });
    //     });
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  });
};
