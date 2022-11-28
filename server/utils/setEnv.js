const dotenv = require('dotenv');

const setEnv = () => {
  const env = process.env.NODE_ENV || 'development';

  if (env === 'development') {
    dotenv.config({ path: `${process.cwd()}/config/dev.env` });
  } else if (env === 'test') {
    dotenv.config({ path: `${process.cwd()}/config/test.env` });
  } else {
    dotenv.config({ path: `${process.cwd()}/config/prod.env` });
  }
};

module.exports = setEnv;
