const webpackConfig = require('./webpack.config.js');

module.exports = Object.assign(webpackConfig, {
  mode: 'development',
  devtool: "eval-cheap-module-source-map",

  devServer: {
    historyApiFallback: true,
    stats: "minimal"
  },
  optimization: {
    concatenateModules: true
  }
});
