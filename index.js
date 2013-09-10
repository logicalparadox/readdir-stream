module.exports = process.env.readdir_COV
  ? require('./lib-cov/readdir')
  : require('./lib/readdir');
