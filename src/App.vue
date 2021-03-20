<template>
  <AppFrame>
    <AppHeader></AppHeader>
    <AppBody>
      <img class="img" :src="img" alt="" />
      <Lottie />
      <div v-for="(item, index) in arr" :key="index" class="item">{{ item }}</div>
    </AppBody>
    <AppFooter></AppFooter>
  </AppFrame>
</template>

<script>
import Lottie from './lottie/Lottie.vue'
import AppFrame from './component/AppFrame'
import AppHeader from './component/AppHeader'
import AppBody from './component/AppBody'
import AppFooter from './component/AppFooter'
import img from '../asset/images/a.jpg'
console.log('App.vue', img)

export default {
  name: 'MyVue',
  components: {
    Lottie,
    AppFrame,
    AppHeader,
    AppBody,
    AppFooter
  },
  data() {
    return {
      img,
      arr: []
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss">
@import '../asset/css/normalize.scss';
</style>
<style lang="scss" scoped>
.img {
  display: block;
  width: 100%;
}
</style>
