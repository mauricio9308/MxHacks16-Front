'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
  host: '0.0.0.0',
  port: 8080,
  log: {
    format: 'dev',
    fileLogger: {
      directoryPath: process.cwd(),
      fileName: 'app.log',
      maxsize: 10485760,
      maxFiles: 2,
      json: false
    }
  },
  app: {
    title: defaultEnvConfig.app.title + ' - Development Environment'
  },
  livereload: true
};
