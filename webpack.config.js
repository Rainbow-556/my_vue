const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// webpack config对象的类型，编写时有代码提示
/** @type {import('webpack').Configuration} */
const config = {
  mode: 'none',
  entry: './src/index.js',
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
          limit: 100 * 1024,
          name: '[name].[contenthash:8].[ext]'
        }
      }
    ]
  },
  plugins: [new CleanWebpackPlugin()]
}

module.exports = config
