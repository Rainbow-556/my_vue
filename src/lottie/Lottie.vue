<template>
  <div class="root-box">
    <div class="box" @click="onAnimationClick">
      <div ref="lottieContainer"></div>
    </div>
  </div>
</template>

<script>
import vectorAnim from './vectorAnim.json'

export default {
  name: 'LottieContainer',
  data() {
    return {
      jsonUrl: '',
      jsonData: null,
      animation: null
    }
  },
  mounted() {
    // 纯矢量
    let path = 'https://cimg1.fenqile.com/ibanner2/M00/00/16/j6gHAF1mSY2ARvszAAAm9dmRf4k118.png'
    // 带图片cdn
    path = 'https://cimg1.fenqile.com/oa200/M00/ex/20210319185523-09b26224-a613-4322-8d6d-f3dd562844c6.json'
    // path = 'https://cimg1.fenqile.com/oa200/M00/ex/20210309113418-6b73e5db-3dd3-4511-b1c5-4b54154c561d.zip'
    // eslint-disable-next-line no-undef
    this.animation = lottie.loadAnimation({
      name: 'anim_1',
      container: this.$refs.lottieContainer, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: false,
      animationData: vectorAnim,
      path // the path to the animation json
      // assetsPath: 'https://m.leka.club/'
    })
    this.animation.addEventListener('loopComplete', e => {
      // console.log('loopComplete')
    })
    console.log('duration', this.animation.getDuration(false))
  },
  methods: {
    onAnimationClick() {
      this.animation.play()
    }
  }
}
</script>

<style lang="scss" scoped>
.root-box {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  background-color: pink;
}
.box {
  width: 300px;
  // height: 100px;
}
</style>
