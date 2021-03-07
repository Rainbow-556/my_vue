const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MyPlugin = require('./build/plugin/MyPlugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
// 是否为开发模式
const isDev = process.env.NODE_ENV === 'development'
console.log('build mode:', process.env.NODE_ENV)

// webpack config对象的类型，编写时有代码提示
/** @type {import('webpack').Configuration} */
const config = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    /*
     开启dev-server时，只能使用[hash]，否则会dev-server会报错
     hash和chunkhash的区别：
      hash：这次打包所有结果的hash，所有使用[hash]占位符最后生成的值都是相同的
      chunkhash：每个chunk都会单独计算hash

     */
    filename: isDev ? 'js/[name].[hash:8].js' : 'js/[name].[chunkhash:8].js'
    // 修改在html中引用的打包后的js、css、图片等引用路径，例子：https://www.aaa.com/assets/images/a.744973e7.jpg
    // publicPath: 'https://www.aaa.com/assets/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      // {
      //   test: /\.css$/,
      //   use: ['vue-style-loader', 'css-loader']
      // },
      // {
      //   test: /\.scss$/,
      //   use: ['vue-style-loader', 'css-loader', 'sass-loader']
      // },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 指定在css引用的图片等资源的路径
              // publicPath: 'https://www.aaa.com/assets/'
            }
          },
          'css-loader',
          'sass-loader'
        ]
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      aVersion: 'true',
      aNumber: '1+2'
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'My Vue',
      filename: 'index.html',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      filename: isDev ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
      chunkFilename: isDev ? '[id].css' : '[id].[contenthash:8].css'
    }),
    new MyPlugin()
  ],
  devtool: 'cheap-module-eval-source-map'
}

if (isDev) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.devServer = {
    host: '127.0.0.1',
    port: 8080,
    contentBase: 'public',
    open: false,
    hot: true
  }
}

module.exports = config
