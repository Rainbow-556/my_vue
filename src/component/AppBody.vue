<template>
  <div class="app-body">
    <slot />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.app-body {
  position: static;
  flex-grow: 1;
  overflow-y: auto;
  // iOS非body元素的内部滚动时，手指离开屏幕时，惯性滚动
  -webkit-overflow-scrolling: touch;
  // 隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
