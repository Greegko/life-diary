module.exports = {
  mode: 'production',
  entry: ["./src/main.tsx"],

  output: {
    filename: "bundle.js",
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
