module.exports = function(api) {
  console.log('-------------babel re-executing the config function run-------------')
  // 使用.js格式的babel配置文件时，好处是可以根据环境动态化配置，坏处是在babel每次编译文件的时候都会调用该函数来计算得到config配置，这里设置cache(true)是设置启用配置永久缓存，意思是该获取配置的函数只会调用一次
  api.cache(true)

  const presets = [
    // preset第0个元素为preset名，第1个元素为preset的配置
    [
      // 用于把新的js特性转换成低版本浏览器能运行的兼容代码
      '@babel/preset-env',
      {
        /* 
          前提是browserlist中的环境不包含新特性时，babel才会引入
          polyfill的引入方式，polyfillusage=在代码中使用到的才自动引入，entry=在入口文件中自己手动引入
          为啥使用entry类型的原因：https://mp.weixin.qq.com/s/hfztxp26YyMOSxiKF2i4eg，见最底部
        */
        useBuiltIns: 'entry',
        corejs: {
          // corejs的版本号
          version: 3,
          // 使用proposals阶段的js特性
          proposals: true
        }
      }
    ]
  ]
  // plugin-transform-runtime：用于把babel生成的运行时辅助函数的引用改成统一引用@babel/runtime包里函数，达到减少包体积的目的。否则相同场景需要的辅助函数在每个文件中都会生成，导致代码重复
  const plugins = [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false
      }
    ]
  ]

  return {
    presets,
    plugins
  }
}
