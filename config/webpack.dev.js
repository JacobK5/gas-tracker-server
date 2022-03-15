const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const NodemonPlugin = require("nodemon-webpack-plugin");
const common = require("./webpack.common.js");

// import path from "path";
// import webpack from "webpack";
// import merge from "webpack-merge";
// import NodemonPlugin from "nodemon-webpack-plugin";
// import common from "./webpack.common.js";

module.exports = merge(
  {
    mode: "development",
    entry: path.resolve(__dirname, "../src/servers/dev.js"),
    plugins: [new NodemonPlugin()],
    devtool: "source-map",
    externals: [
      {
        formidable: "commonjs formidable",
      },
    ],
  },
  common
);
