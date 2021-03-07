class MyPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        console.log('emit asset: ', name)
        // console.log('assets', compilation.assets[name].source()) // 输出文件内容
      }
    })
  }
}

module.exports = MyPlugin
