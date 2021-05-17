<template>
  <div class="app-header">
    <slot><div class="default-element">Header</div></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.app-header {
  box-sizing: border-box;
  height: 60px;
  // 防止AppBody的子元素高度变大时，AppHeader的高度被压缩
  flex-shrink: 0;
  background-color: gray;
  .default-element {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
