var path = require('path');
var webpack = require('webpack');

var DEV = path.resolve(__dirname, "dev");
var DIST = path.resolve(__dirname, "dist");

module.exports = {
  entry: DEV+ '/app.js',
  output: {
    path: DIST,
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        include: DEV,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl-loader'
      }
    ]
  },
  devtool: 'source-map'
};