const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MyPlugin = require('./build/plugin/MyPlugin')

// webpack config对象的类型，编写时有代码提示
/** @type {import('webpack').Configuration} */
const config = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g)/i,
        loader: 'url-loader',
        options: {
          limit: 50 * 1024,
          name: '[name].[contenthash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'My Vue',
      filename: 'index.html',
      template: './src/index.html'
    }),
    new MyPlugin()
  ]
}

module.exports = config
