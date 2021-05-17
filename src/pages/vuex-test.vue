<template>
  <div class="vuex-test-box" @click.stop>
    <p>Vuex Test</p>
    <p>State、Mutation</p>
    <button @click="setName">setName</button>
    <button @click="addAge">addAge</button>
    <p>{{ $store.state.name }}: {{ $store.state.age }}</p>
    <p>{{ nameAlias }}: {{ nextAge }}</p>
    <button @click="addTodo">addTodo</button>
    <p>doneTodosCount: {{ $store.getters.doneTodosCount }}</p>
    <p>Getters</p>
    <p v-for="item in $store.getters.doneTodos" :key="item.name">{{ item.name + ' is ' + item.state }}</p>
    <input v-model="todoName" type="text" />
    <p>getTodoByName: {{ $store.getters.getTodoByName(todoName) }}</p>
    <p>Action</p>
    <button @click="triggerAction">triggerAction</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'VuexTest',
  data() {
    return {
      value: 1,
      todoName: ''
    }
  },
  computed: {
    // 数组形式
    // ...mapState(['name', 'age'])
    ...mapState({
      // 别名
      nameAlias: 'name',
      // 函数（不能使用箭头函数），提供再一次处理state的机会，并且可以访问当前Vue实例的data
      nextAge(state) {
        return state.age + this.value
      }
    })
  },
  methods: {
    setName() {
      this.$store.commit('setName', 'Rainbow5566')
    },
    addAge() {
      this.$store.commit('addAge')
    },
    addTodo() {
      this.$store.commit('addTodo', { name: 'vue-router', state: 'undone' })
    },
    triggerAction() {
      // $store.dispatch()始终返回Promise
      // const res = this.$store.dispatch('setNameAsync', 'nameAsync')
      const res = this.$store.dispatch('updateNameFromServer')
      res.then(() => {
        console.log('action end', this.$store.state.name)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.vuex-test-box {
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 15px;
}
</style>
