#! /usr/bin/env node

// node cli 应用必要的文件头

// 如果是 Linux 或 macOS 系统下还需要修改文件的读写权为 755

// 通过命令行询问用户问题
// 根据用户回答的结果生成文件
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const ejs = require('ejs');

// 问问题
inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Project name?',
      default: 'new-czh-project',
    },
    {
      type: 'list',
      name: 'type',
      message: 'Project type?',
      default: 'public-gulp',
      choices: ['public-gulp', ],
      // 'react', 'vue'
    },
  ])
  .then((answers) => {
    // 根据用户回答生成文件
    const { name, type } = answers;

    const tmplDir = path.join(__dirname, 'templates', type);
    const destDir = path.join(__dirname, name);

    try {
      fs.readdir(tmplDir, (err, files) => {
        if (err) {
          throw new Error(err);
        }
        // recursive 递归
        fs.mkdir(name, { recursive: true }, (err) => {
          if (err) {
            throw new Error(err);
          }
          files.forEach((file) => {
            ejs.renderFile(path.join(tmplDir, file), answers, (err, result) => {
              if (err) {
                throw new Error(err);
              }
            });
            fs.writeFileSync(path.join(destDir, file), file);
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  });
