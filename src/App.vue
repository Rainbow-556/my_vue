<template>
  <div class="root">
    <div class="text">{{ number }}</div>
    <div class="btn" @click="add">add</div>
    <img class="img" :src="img" alt="" />
  </div>
</template>

<script>
import img from '../asset/images/a.jpg'
console.log('app.vue', img)

export default {
  data() {
    return {
      number: 0,
      img
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
$color: red;
.root {
  background-color: $color;
}
.text {
  font-size: 25px;
  color: black;
}
.btn {
  color: blue;
}
.img {
  display: block;
  width: 100%;
}
</style>
