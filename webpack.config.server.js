const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'

const extractSass = new ExtractTextPlugin({
    filename: "style.css",
    publicPath: '/assets/',
    disable: process.env.NODE_ENV === "development"
});

const config = {
  entry: {
    server: './server/index',
    vendor: ['react', 'react-dom', 'express']
  },
  watch: !isProduction,
  target: 'node',
  externals: [ nodeExternals() ],
  module: {
    rules: [
      { 
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
              loader: "css-loader"
          }, {
              loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    extractSass 
  ],
  output: {
    path: __dirname + "/dist",
    filename: '[name].js'
  }
}

if (!isProduction) {
  config.plugins.unshift(
    new StartServerPlugin({
      name: 'server.js',
      nodeArgs: ['--inspect=5352']
    })
  )
} else {
  config.plugins.unshift(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  )
  config.plugins.unshift(
    new webpack.optimize.UglifyJsPlugin()
  )
}

module.exports = config;
