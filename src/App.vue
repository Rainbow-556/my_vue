<template>
  <AppFrame>
    <AppHeader />
    <AppBody>
      <p class="number">1000</p>
      <p>1000</p>
      <img class="img" :src="img" alt="" />
      <button @click="showLottie = !showLottie">showLottie</button>
      <Lottie v-if="showLottie" />
      <VuexTest />
    </AppBody>
    <AppFooter />
  </AppFrame>
</template>

<script>
import AppFrame from './component/AppFrame'
import AppHeader from './component/AppHeader'
import AppBody from './component/AppBody'
import AppFooter from './component/AppFooter'
import VuexTest from './pages/vuex-test'
import img from './asset/image/a.jpg'
console.log('App.vue', img)

export default {
  name: 'MyVue',
  components: {
    Lottie: () => import(/* webpackChunkName: "lottie-chunk" */ './lottie/Lottie.vue'),
    AppFrame,
    AppHeader,
    AppBody,
    AppFooter,
    VuexTest
  },
  data() {
    return {
      img,
      showLottie: false
    }
  },
  computed: {},
  created() {},
  methods: {}
}
</script>

<style>
@import './asset/css/global.scss';
</style>
<style lang="scss" scoped>
.img {
  display: block;
  width: 375px;
  border-radius: var(--radius);
}
.number {
  font-family: 'DINPro-Medium';
}
</style>
