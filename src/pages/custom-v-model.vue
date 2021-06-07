<template>
  <div>{{ num }}</div>
</template>

<script>
export default {
  name: 'CustomVModel',
  /* 
    自定义v-model，实现数据双向绑定
    外部调用：<CustomVModel v-model="parentNum">
   */
  model: {
    /*
      v-model默认的prop名为value，event名为input
      Vue支持自定义这两个值
     */
    prop: 'num',
    event: 'updateNum'
  },
  // 同时也要声明num
  props: ['num'],
  created() {
    let count = 5
    const id = setInterval(() => {
      if (count >= 0) {
        count--
        // 发送model里自定义的event事件，父组件会监听该事件并自动更新父组件自己的值，单向数据流再更新子组件的值
        this.$emit('updateNum', this.num + 1)
      } else {
        clearInterval(id)
      }
    }, 2000)
  }
}
</script>

<style lang="scss" scoped></style>
