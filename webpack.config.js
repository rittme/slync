"use strict";
const WebpackNotifierPlugin = require("webpack-notifier");
const webpack = require("webpack");
const path = require("path");
const absolute = (relPath) => path.join(__dirname, relPath);
const EnvLoaderPlugin = require("webpack-env-loader-plugin");

const srcPath = absolute("./app/main.js");
const outputDir = absolute("./data/content");
const outputFilename = "bundle.js";

let env = process.env.NODE_ENV || "development";

let plugins =  [
  new WebpackNotifierPlugin(),
  new EnvLoaderPlugin({
    env,
    filePattern: "config.{env}.yml",
    loadLocalOverride: env === "development" ? "config.yml" : null,
    reactEnv: true
  })
];

if (env !== "test") {
  plugins.push(new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"));
}

if (env === "production") {
  plugins = plugins.concat([
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      test: /vendor/,
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.DedupePlugin()
  ]);
}

module.exports = {
  entry: {
    app: srcPath,
    vendor: [
      "react",
      "react-dom",
      "moment"
    ]
  },
  output: {
    path: outputDir,
    filename: outputFilename,
  },
  externals: {
    'firebaseConfig': JSON.stringify(require('./firebase.config.json'))
  },
  target: "web",
  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias: {
      "components": absolute("./app/components"),
      "reducers": absolute("./app/reducers"),
      "actions": absolute("./app/actions"),
      "containers": absolute("./app/containers"),
      "selectors": absolute("./app/selectors"),
      "lib": absolute("./app/lib"),
      "test": absolute("./content-test")
    }
  },
  module: {
    loaders: [
      {test: /\.json$/, loader: "json"},
      {
        test: /\.jsx?$/,
        include: /.\/(app|content-test)\//,
        loader: "babel"
      }
    ]
  },
  devtool: env === "production" ? null : "eval", // This is for Firefox
  plugins
};
