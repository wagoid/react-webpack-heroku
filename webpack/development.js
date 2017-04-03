const config = require('./base')
const DashboardPlugin = require('webpack-dashboard/plugin')
require('dotenv').config()

const port = process.env.DEV_PORT || '4200'

config.entry.client.unshift(
  'react-hot-loader/patch',
  `webpack-dev-server/client?http://localhost:${port}`,
  'webpack/hot/only-dev-server'
)

config.module.rules.push({
  test: /\.scss$/,
  use: [
    'style-loader',
    'css-loader?modules&importLoaders=1' +
      '&localIdentName=[path][local]__[hash:base64:5]',
    'sass-loader'
  ]
})

config.output.publicPath = '/public'

config.plugins.push(new DashboardPlugin({ port: 9857 }))

module.exports = config
