const path    = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'sourcemap',
  entry: {
    app: './src/app/app.js'
  },
  module: {
    loaders: [
       { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
       { test: /\.html$/, loader: 'raw' },
       { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass') },
       { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?limit=10000!img?progressive=true'},
       { test: /\.(woff|woff2|ttf|eot)$/, loader: 'file'}
    ]
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      inject: 'body'
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'src')) === -1;
      }
    }),
    new ExtractTextPlugin('[name].[hash].css')
  ]
};
