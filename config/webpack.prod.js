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
    mode: "production",
    entry: path.resolve(__dirname, "../src/servers/prod.js"),
    optimization: {
      minimize: true,
    },
  },
  common
);
