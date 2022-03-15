const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "app.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{ loader: "babel-loader", options: { cacheDirectory: true } }],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "../src"),
    },
  },
  externals: [nodeExternals()],
};
