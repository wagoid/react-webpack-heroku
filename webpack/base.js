const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const SassLintPlugin = require('sasslint-webpack-plugin')

const extractCSS = new ExtractTextPlugin({
  filename: 'vendor.css',
  allChunks: true
})

module.exports = {
  entry: {
    client: [path.resolve(__dirname, '../client/index.js')]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        use: extractCSS.extract({
          use: 'css-loader'
        })
      }, {
        test: /\.(eot|woff|woff2|ttf|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      }, {
        test: /\.svg$/,
        use: ['babel-loader?compact=false', 'svg-react-loader']
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name].js'
  },
  plugins: [
    extractCSS,
    new SassLintPlugin({
      configFile: path.resolve(__dirname, '../.sass-lint.yml'),
      glob: 'client/**/*.scss'
    })
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, '../client'),
      'node_modules'
    ],
    extensions: ['.js', '.scss']
  }
}
