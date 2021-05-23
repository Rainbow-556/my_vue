const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
// css压缩
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// js压缩
const TerserPlugin = require('terser-webpack-plugin')
const MyPlugin = require('./build/plugin/MyPlugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
// 是否为开发模式
const isDevMode = process.env.NODE_ENV === 'development'
console.log('build mode:', process.env.NODE_ENV)

// webpack config对象的类型，编写时有代码提示
/** @type {import('webpack').Configuration} */
const config = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    // webpack打包后的文件输出根目录
    path: path.join(__dirname, 'dist'),
    /*
     开启dev-server时，只能使用[hash]，否则会dev-server会报错
     hash和chunkhash的区别：
      hash：这次打包所有结果的hash，所有使用[hash]占位符最后生成的值都是相同的
      chunkhash：每个chunk都会单独计算hash
     */
    filename: isDevMode ? 'js/[name].[hash:8].js' : 'js/[name].[chunkhash:8].js'
    /*
     修改在html中引用的打包后的js、css、图片等引用路径，例子：https://www.aaa.com/assets/images/a.744973e7.jpg
     不填时，在文件中引用的路径是：images/a.744973e7.jpg，浏览器会默认把当前host作为资源请求的host
    */
    // publicPath: 'https://www.aaa.com/assets/'
  },
  resolve: {
    extensions: ['.vue', '.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // webpack v4 使用cache-loader为babel-loader在编译过程中增加缓存，提升编译速度
        use: ['cache-loader', 'babel-loader']
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      // {
      //   test: /\.css$/,
      //   use: ['vue-style-loader', 'css-loader']
      // },
      // {
      //   test: /\.s?css$/,
      //   use: ['vue-style-loader', 'css-loader', 'sass-loader']
      // },
      {
        test: /\.s?css$/,
        use: [
          // isDevMode
          //   ? 'vue-style-loader' // 开发模式使用style-loader，更快
          //   : {
          //       // 生产模式把css抽取成单独的文件
          //       loader: MiniCssExtractPlugin.loader,
          //       options: {
          //         // 指定在css引用的图片等资源的路径
          //         // publicPath: 'https://www.aaa.com/assets/'
          //       }
          //     },
          {
            // 把css抽取成单独的文件
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 指定在css引用的图片等资源的路径
              // publicPath: 'https://www.aaa.com/assets/'
            }
          },
          // 把css内容用js动态生成style标签插入到head标签里
          // 'style-loader', // or vue-style-loader(使用vue时，就要用该loader)
          // 把css转换成commonjs对象
          {
            loader: 'css-loader',
            options: {
              /*
                当css-loader处理css内容时，发现里面还有@import引用的资源时，会把该资源交给它上N个loader处理（N为配置的个数）
                具体解释：https://jsweibo.github.io/2019/07/02/webpack%E4%B8%AD%E7%9A%84css-loader/#importLoaders
                */
              importLoaders: 1
            }
          },
          'postcss-loader',
          /*
            resolves relative paths in url() statements based on the original source file
            解决scss文件中引用font文件时的路径问题，https://webpack.js.org/loaders/sass-loader/#problems-with-url
            https://github.com/angular/angular-cli/issues/5213#issuecomment-284783844
          */
          'resolve-url-loader',
          // 把scss文件转换成css
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        loader: 'url-loader',
        options: {
          limit: 50 * 1024,
          // 输出到images目录下
          outputPath: 'image',
          name: '[name].[contenthash:8].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/i,
        loader: 'file-loader',
        options: {
          /*
            https://github.com/webpack-contrib/file-loader/issues/32#issuecomment-250622904
            当配置字体文件输出到fonts文件夹，css输出到css文件夹时，css里如果引用了font，经过编译并在浏览器里运行时，
            css里发起的font文件网络请求地址为：host/css/fonts/xxx.woff，从而导致找不到font文件报404。
            所以配置publicPath: '../'（回退一级目录）
            host/css/fonts/xxx.woff -> host/fonts/xxx.woff
          */
          // publicPath: '../fonts',
          publicPath: '../',
          // outputPath: 'fonts',
          name: 'font/[name].[contenthash:8].[ext]'
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
      filename: isDevMode ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
      chunkFilename: isDevMode ? 'css/[name].[id].css' : 'css/[name].[id].[contenthash:8].css'
    }),
    new MyPlugin()
  ],
  optimization: {
    minimize: !isDevMode,
    minimizer: [new TerserPlugin(), new OptimizeCssAssetsWebpackPlugin()]
  },
  /*
    https://v4.webpack.js.org/configuration/devtool/
    生产环境下可以使用none或nosources-source-map
    当使用none时，css里引用font文件的路径必须是绝对路径，否则会打包失败
   */
  devtool: isDevMode ? 'cheap-module-eval-source-map' : 'none'
}

if (isDevMode) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.devServer = {
    // 0.0.0.0表示设置host为本机局域网ip，在本机访问时可通过localhost:8080访问。局域网内的设备可以通过本机ip:8080访问
    host: '0.0.0.0', // localhost
    port: 8080,
    // 非webpack打包输出的静态文件提供目录，项目根目录里的public下的文件可以直接通过localhost:8080/b.txt访问到
    contentBase: 'public',
    hot: true,
    open: false
  }
}

module.exports = config
