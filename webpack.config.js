const webpack = require("webpack");

module.exports = {
  cache: true,
  entry: "./js/main.js",
  output: {
    path: __dirname,
    filename: "./js/build/bundle.js"
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: "vue" }
    ]
  }
};

