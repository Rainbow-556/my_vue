// babel的useBuiltIns: 'entry'，需手动引入polyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import store from './store'

// 打印通过DefinePlugin设置的全局属性
console.log('DefinePlugin', aNumber, aVersion, process.env.NODE_ENV)

import(/* webpackPreload: true, webpackChunkName: "aLib-chunk" */ './lib/aLib')

setTimeout(() => {
  // 动态导入
  import(/* webpackChunkName: "bLib-chunk" */ './lib/bLib').then(res => {
    console.log('bLib loaded:', res.default.value)
  })
}, 3000)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
