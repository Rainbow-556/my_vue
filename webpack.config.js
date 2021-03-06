const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MyPlugin = require('./build/plugin/MyPlugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// webpack config对象的类型，编写时有代码提示
/** @type {import('webpack').Configuration} */
const config = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: '[name].[contenthash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g)/i,
        loader: 'url-loader',
        options: {
          limit: 50 * 1024,
          // 输出到images目录下
          name: 'images/[name].[contenthash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'My Vue',
      filename: 'index.html',
      template: './src/index.html'
    }),
    new MyPlugin()
  ]
}

module.exports = config
