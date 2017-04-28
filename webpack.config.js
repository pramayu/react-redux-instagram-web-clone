var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/base.js')
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'javascripts/bundle.js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/node-fetch/),
    new ExtractTextPlugin({
      filename: "stylesheets/build.css",
      disable: false,
      allChunks: true
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss?$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader","sass-loader"],
          publicPath: path.join(__dirname, 'public')
        })
      }
    ]
  },
  node: {
    net: 'empty',
    dns: 'empty',
    child_process: 'empty'
  }
}
