const { promisify } = require('util');

const ora = require('ora');
const axios = require('axios');
const downloadGitRepo = promisify(require('download-git-repo'));

const loading = (fn, message) => async (...args) => {
  const { waitting, succeed, fail } = message;
  const spinner = ora(waitting);
  spinner.start();
  try {
    await fn(...args);
    spinner.text = succeed;
    spinner.succeed();
  } catch (err) {
    spinner.text = fail;
    spinner.fail();
  }
};

// 下载模版
const download = async (reposUrl, destUrl) => {
  try {
    await downloadGitRepo(reposUrl, destUrl); // 下载模版存放到指定路径
  } catch (err) {
    console.log(err);
  }

  return destUrl; // 下载的最终目录路径
};

const fetchRepoList = async (reposUrl) => {
  // 获取当前组织中的所有仓库信息,这个仓库中存放的都是项目模板
  const { data } = await axios.get(reposUrl); // xxx代表某个仓库
  return data;
};
module.exports = {
  loading,
  download,
  fetchRepoList,
};
