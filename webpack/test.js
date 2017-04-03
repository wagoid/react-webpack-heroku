const config = require('./base')

config.module.rules.push({
  test: /\.scss$/,
  use: [
    'css-loader?modules&importLoaders=1' +
      '&localIdentName=[path][local]__[hash:base64:5]',
    'sass-loader'
  ]
})

module.exports = config
