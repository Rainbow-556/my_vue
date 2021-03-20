<template>
  <div class="app-frame">
    <slot />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
/*
  设计思路:
    不使用position: fixed来实现header和footer固定在顶部和底部。设置html、body、app-frame的width和height均为100%
  AppFrame: 
    应用的根元素，是body的直接子元素
  AppHeader: 
    头部，固定在顶部
  AppBody: 
    应用body部分，高度默认为(屏幕高度 - AppHeader - AppFooter)，为动态的(设置AppFrame为flex布局，竖直排列，AppBody设置flex-grow: 1，高度自动撑满，同时AppHeader和AppFooter设置flex-shrink: 0，高度不压缩)。子元素高度溢出时，在该元素内滚动
  AppFooter:
    footer，固定在底部
*/
.app-frame {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  // 使用hidden时，iOS就没有滚到底的回弹效果
  // overflow: hidden;
}
</style>
