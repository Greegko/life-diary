const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackConfig = require('./webpack.config.js');

module.exports = Object.assign(webpackConfig, {
  mode: 'development',
  devtool: "eval-cheap-module-source-map",

  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    stats: "minimal"
  },

  devtool: "source-map",

  optimization: {
    concatenateModules: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      useEmulator: `
        firebase.auth().useEmulator('http://localhost:9099/');
        firebase.functions().useEmulator("localhost", 5001);
        firebase.firestore().useEmulator("localhost", 5002);
      `
    }),
    webpackConfig.plugins[1]
  ]
});
