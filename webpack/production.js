const config = require('./base')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const extractSCSS = new ExtractTextPlugin({
  filename: 'client-[hash].css',
  allChunks: true
})

config.output.path = path.resolve(__dirname, '../public')
config.output.filename = '[name]-[hash].js'

config.module.rules.push({
  test: /\.scss$/,
  loader: extractSCSS.extract({
    fallback: 'style-loader',
    use: [
      'css-loader?modules&importLoaders=1' +
        '&localIdentName=[local]_[hash:base64:5]',
      'sass-loader'
    ]
  }
  )
})

config.plugins.push(
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  extractSCSS,
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true, // eslint-disable-line camelcase
      warnings: false
    },
    sourceMap: false
  }),
  new HtmlWebpackPlugin({
    inject: 'body',
    template: 'index.production.html',
    title: 'Hello production!'
  })
)

module.exports = config
