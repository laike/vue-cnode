const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
// const webpack = require('webpack')
const isProduction = process.env.NODE_ENV === 'production'
module.exports = webpackMerge(baseConfig, {
  mode: 'development',
  target: 'node',
  entry: path.join(__dirname, '../client/entry-server.js'),
  resolve: {},
  externals: [nodeExternals()],
  output: {
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dev/')
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: isProduction
          ? ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].min.css',
      allChunks: false
    }),
    new webpack.DefinePlugin({
      'process.env.API_BASE': JSON.stringify('http://localhost:3333')
    })
  ]
})
