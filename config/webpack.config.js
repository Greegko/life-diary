const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: ["./src/main.tsx"],

  output: {
    filename: "[name].[contenthash].js",
    path: __dirname + "/../public"
  },

  externals: {
    firebase: 'firebase',
    react: 'React',
    'react-dom': 'ReactDOM'
  },

  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".ts", ".tsx"]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index_template.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./assets", to: "./assets" }
      ],
    })
  ],

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ["ts-loader"]
      }
    ]
  }
};
