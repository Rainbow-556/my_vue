import Vue from 'vue'
import App from './App.vue'
// 打印通过DefinePlugin设置的全局属性
console.log('DefinePlugin', aNumber, aVersion, process.env.NODE_ENV)

import(/* webpackPreload: true, webpackChunkName: "aLib" */ './lib/aLib')

setTimeout(() => {
  // 动态导入
  import(/* webpackChunkName: "bLib" */ './lib/bLib').then(res => {
    console.log('bLib loaded:', res.default.value)
  })
}, 3000)

new Vue({
  render: h => h(App)
}).$mount('#app')
