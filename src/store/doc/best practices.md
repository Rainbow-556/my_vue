[mastering-vuex-zero-to-hero](https://medium.com/dailyjs/mastering-vuex-zero-to-hero-e0ca1f421d45)  
[vuex best practice](https://gist.github.com/DawidMyslak/2b046cca5959427e8fb5c1da45ef7748)  
[a-complete-guide-to-mapping-in-vuex](https://blog.logrocket.com/a-complete-guide-to-mapping-in-vuex/)

### Vuex 是什么

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储（**单例模式，全局共享**）管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式（**mutation**）发生变化。

### 解决了什么问题

当应用遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏：

- 多个视图依赖于同一状态
- 来自不同视图的行为需要变更同一状态

对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力 对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。  
因此，把组件的共享状态抽取出来，以一个全局单例模式管理。在这种模式下，页面的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为。  
Vuex 就是为了解决组件共享状态的问题，一个状态管理工具。比较适合在中大型的单页应用使用。而对于简单的应用，可以手动实现一个简单的[store 模式](https://cn.vuejs.org/v2/guide/state-management.html#%E7%AE%80%E5%8D%95%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E8%B5%B7%E6%AD%A5%E4%BD%BF%E7%94%A8)

### Vuex 设计理念

设计思想借鉴于**Flux 架构**  
[Flux 介绍](https://facebook.github.io/flux/docs/in-depth-overview)  
[Flux 核心概念](https://github.com/facebook/flux/tree/master/examples/flux-concepts)  
// todo 附加 flux 架构图？

### 核心概念

![alt 属性文本](./vuex.png)

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    todos: [
      { name: 'vue', state: 'done' },
      { name: 'vuex', state: 'undone' }
    ]
  },
  getters: {
    doneTodos(state) {
      return state.todos.filter(item => item.state === 'done')
    },
    // 使用其他getter
    doneTodosCount(state, getters) {
      return getters.doneTodos.length
    }
  },
  mutations: {
    setTodos(state, payload) {
      state.todos = payload
    },
    addTodo(state, payload) {
      state.todos.push(payload)
    }
  },
  actions: {
    getTodosFromServer(context, payload) {
      const { commit } = context
      // 模拟异步
      setTimeout(() => {
        const todos = [
          { name: 'vue', state: 'done' },
          { name: 'vuex', state: 'undone' },
          { name: 'vue-router', state: 'undone' }
        ]
        commit('setTodos', todos)
      }, 2000)
    }
  }
})

export default store
```

1. store
   - 就是一个容器，它包含着你的应用中全局共享的状态 state
2. state
   - 全局共享的状态具体存放的地方。通过 store.state.todos 访问 todos
3. getters
   - 可以认为是 store 的 computed 计算属性。getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。通过 store.getters.doneTodosCount 访问
4. mutation
   - 唯一能改变 state 的方式（不能直接使用~~store.state.todos.push(todo)~~）。只能通过 store.commit('addTodo', todo) 更新数据

### 常见场景下如何正确使用

1. state 里的数据字段初始化

```js
// store.js
state: {
   userInfo: {
      name: '',
      isVip: false
   }
}
```

- 如果已知确定类型的属性，需设置对应类型的初始值
- 如果属性为对象类型，尽可能把对象里的子属性也同时声明，方便知道该属性具体包含哪些子属性
- 在后续新增属性时，推荐使用 Vue.set(obj, key, value)方式添加新属性，不建议用 spread 运算符重新赋值的形式（每次都会导致该 obj 涉及的所有 getter 都会计算）。使用以上的方式可以使新增的属性是响应式的
- 建议只把需要用到的属性放到 state 里，不要弄大对象

2. getters

### mapState、mapActions 等辅助函数的使用

当要使用超过 2 个及以上的 state、action、getter，推荐使用辅助函数，代码会变得比较简洁。

```js
// 直接map
// 使用别名，如有命名冲突
// 二次操作，使用函数的方式
```

### state、getter、action 文件分离，避免文件过大变得复杂

### module 分离

### 使用 webpack 的 require.context()方法实现自动注册 vuex 的所有 module、module 里的 mutation、action、getters
