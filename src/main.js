import './a.js'
import './a.css'
import aImg from '../asset/images/a.jpg'
import Vue from 'vue'
import App from './App.vue'

console.log('aImg: ' + aImg)
document.getElementsByClassName('img')[0].setAttribute('src', aImg)

new Vue({
  render: h => h(App)
}).$mount('#app')
