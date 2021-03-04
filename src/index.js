import './a.js'
import './a.css'
import aImg from '../asset/a.jpg'

console.log('aImg: ' + aImg)
document.getElementsByClassName('img')[0].setAttribute('src', aImg)
