const DotEnv = require('dotenv');
const parsedEnv = DotEnv.config().parsed;

// eslint-disable-next-line func-names
module.exports = function () {
  for (key in parsedEnv) {
    if (typeof parsedEnv[key] === 'string') {
      parsedEnv[key] = JSON.stringify(parsedEnv[key]);
    }
  }
  return parsedEnv;
};
