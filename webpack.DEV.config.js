const webpack = require('webpack');
const path    = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let config  = require('./webpack.config');


config.devTool = 'source-map';

config.output = {
  filename: '[name].bundle.js',
  publicPath: 'http://localhost:8080/',
  path: path.resolve(__dirname, '/dist'),
  chunkFilename: '[name].bundle.js'
};

config.plugins = config.plugins.concat([

  // Adds webpack HMR support. It act's like livereload,
  // reloading page after webpack rebuilt modules.
  // It also updates stylesheets and inline assets without page reloading.
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin('[name].[hash].css', {disable: true})
]);

config.devServer = {
    contentBase: './src/public',
    stats: 'minimal'
}

module.exports = config;
