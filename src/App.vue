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
console.log('app.vue', img)

export default {
  name: 'Test',
  components: {
    Lottie,
    AppFrame,
    AppHeader,
    AppBody,
    AppFooter
  },
  data() {
    return {
      number: 1,
      img,
      arr: []
    }
  },
  created() {},
  methods: {
    add() {
      this.number++
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  display: block;
  width: 100%;
}
</style>
