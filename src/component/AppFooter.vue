<template>
  <div class="app-footer">
    <slot><div class="default-element">Footer</div></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.app-footer {
  box-sizing: border-box;
  min-height: 80px;
  background-color: purple;
  flex-shrink: 0;
  .default-element {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
