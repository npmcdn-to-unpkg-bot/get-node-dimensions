var path = require('path');
var webpackConfig = {
  devtool: 'eval',
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    loaders: process.env.COVERAGE
      ? [{
          test: /\.js$/,
          loader: 'babel',
          include: [path.resolve('./test')]
        }, {
          test: /\.js$/,
          loader: 'isparta',
          include: [path.resolve('./src')]
        },]
      : [{
          test: /\.js$/,
          loader: 'babel',
          include: [path.resolve('./src'), path.resolve('./test')],
        }, {
          test: /\.scss$/,
          loader: 'style!css!sass?sourceMap'
        }],
  },
  stats: {
    colors: true,
  }
};

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/babel-core/browser-polyfill.js',
      'test/index.js',
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: {
        chunkModules: false,
        colors: true,
      }
    },
    preprocessors: {
      'test/index.js': ['webpack'],
    },
    reporters: ['progress'],
    captureTimeout: 90000,
    browserNoActivityTimeout: 60000,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
  });
};
