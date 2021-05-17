import Vue from 'vue'
import Vuex from 'vuex'

// 使用Vuex插件，会把Vuex注入到所有子组件Vue实例中，作为$store属性
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    name: 'Rainbow556',
    age: 20,
    todos: [
      { name: 'vue', state: 'done' },
      { name: 'vuex', state: 'undone' }
    ]
  },
  // 类似于computed，每次计算的结果会缓存
  getters: {
    // 普通调用
    doneTodos(state) {
      return state.todos.filter(item => item.state === 'done')
    },
    // 调用其他getter
    doneTodosCount(state, getters) {
      return getters.doneTodos.length
    },
    // 通过方法访问
    getTodoByName(state) {
      return function(name) {
        if (!name) {
          return state.todos
        }
        return state.todos.find(item => item.name === name)
      }
    }
  },
  mutations: {
    setName(state, name) {
      state.name = name
    },
    addAge(state) {
      state.age++
    },
    addTodo(state, todo) {
      state.todos.push(todo)
    }
  },
  actions: {
    // context是和store具有相同属性和方法的一个对象，为什么不是同一个对象？module？
    setNameAsync(context, name) {
      const { commit } = context
      setTimeout(() => {
        commit('setName', name)
      }, 1000)
    },
    async updateNameFromServer(context) {
      const { commit } = context
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve('Rainbow556-fromServer')
        }, 1000)
      })
      const name = await promise
      commit('setName', name)
    }
  }
})

export default store
