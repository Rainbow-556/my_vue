import './a.scss'
import './a2.scss'
import A from './a.vue'

console.log('aLib run')
const a = 2

new Promise(resolve => {
  resolve(a)
})

export default {
  value: 'from aLib'
}
