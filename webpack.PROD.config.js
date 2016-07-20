const webpack = require('webpack');
const path    = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
let config  = require('./webpack.config');

config.output = {
  filename: '[name].[hash].js',
  publicPath: '/',
  path: path.resolve(__dirname, 'dist'),
  chunkFilename: '[name].[hash].js'
};

config.plugins = config.plugins.concat([
  // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
  // Only emit files when there are no errors
  new webpack.NoErrorsPlugin(),

  // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
  // Dedupe modules in the output
  new webpack.optimize.DedupePlugin(),

  // Reduces bundles total size
  new webpack.optimize.UglifyJsPlugin({
    mangle: {

      // You can specify all variables that should not be mangled.
      // For example if your vendor dependency doesn't use modules
      // and relies on global variables. Most of angular modules relies on
      // angular global variable, so we should keep it unchanged
      except: ['$super', '$', 'exports', 'require', 'angular']
    }
  }),

  // Copy assets from the public folder
  // Reference: https://github.com/kevlened/copy-webpack-plugin
  new CopyWebpackPlugin([{
    from: __dirname + '/src/public'
  }]),

  
]);

module.exports = config;
