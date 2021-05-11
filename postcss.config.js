/**
 * postcss-preset-env类似于babel的preset-env，其实是包含了一系列的postcss插件的集合（如包含autoprefixer、CSS properties）
 * 用于把现代的css语法转换成兼容旧版浏览器能识别的语法
 * 转换规则会根据.browserlist的配置来决定要转换哪些，对于已支持的浏览器就不会转（如果browserlist配置的都是比较新的话）
 */
const postcssPresetEnv = require('postcss-preset-env')
module.exports = {
  plugins: [
    postcssPresetEnv({
      // 只对stage=3阶段的特性添加pollyfill
      stage: 3,
      // 指定变量的来源
      importFrom: './asset/css/postcss-preset-env-variables.css',
      // 可以根据特性id单独打开或关闭
      features: {}
    })
  ]
}
