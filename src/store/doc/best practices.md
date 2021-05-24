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

设计思想借鉴于**Flux 模式**  
[Flux 介绍](https://facebook.github.io/flux/docs/in-depth-overview)  
[Flux 核心概念](https://github.com/facebook/flux/tree/master/examples/flux-concepts)  
单向数据流（Data in a Flux application flows in a single direction）
![alt vuex](./flux.png)

### 核心概念

![alt vuex](./vuex.png)

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

3. getter

- 可以认为是 store 的 computed 计算属性。getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。通过 store.getters.doneTodosCount 访问

4. mutation

- 唯一能改变 state 的方式（不能直接使用~~store.state.todos.push(todo)~~）。只能通过 store.commit('addTodo', todo) 更新数据

5. action

- 类似于 mutation，内部支持异步操作。最终要改变 state 时，也是通过提交 mutation。通过 store.dispatch(actionType, payload) 调用

6. module

- 把复杂的 store 分离成各个小 module，每个 module 拥有自己的 state、mutation、action、getter、甚至是嵌套子模块

### 如何正确使用

1. state 里的数据初始化

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
- 使用 mapState 辅助函数导入 state

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: {
    ...mapState({
      // 将 this.count 映射为 store.state.count
      count: state => state.count,
      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',
      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalState(state) {
        return state.count + this.localCount
      }
    })
  }
}
```

2. getter 相关

- 通常 getter 返回的都是普通值。必要情况下，getter 返回一个函数会特别有用

```js
export default {
  // ...
  getters: {
    doneTodos(state) {
      return state.todos.filter(item => item.state === 'done')
    },
    // 通过方法访问。外部可通过 store.getters.getTodoByName('vuex') 调用
    getTodoByName(state) {
      return function(name) {
        return state.todos.find(item => item.name === name)
      }
    }
  }
}
```

- 使用 mapGetters 辅助函数

```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    // 把 `this.doneTodosCount` 映射为 `this.$store.getters.doneTodosCount`
    ...mapGetters(['doneTodosCount', 'anotherGetter']),
    ...mapGetters({
      // 设置别名，要使用对象形式
      // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
      doneCount: 'doneTodosCount'
    })
  }
}
```

3. mutation 相关

- 统一使用 store.commit(mutationType, payload) 方式提交 mutation，payload 使用对象类型，降低该 mutation 后续新增入参时改动的成本
- 如果需要动态在 state 里新增属性时，使用 Vue.set(obj, key, value)
- 使用 mapMutations 辅助函数

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
      'increment',
      // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
      'incrementBy'
    ]),
    ...mapMutations({
      // 将 `this.add()` 映射为 `this.$store.commit('increment')`
      add: 'increment'
    })
  }
}
```

4. action 相关

- 定义在 store 中的每个 action 的返回值 res 都会被 Vuex 封装成 Promise 的 resolve(res)
- 使用 async/await 处理 action 里的异步操作，让外部调用方能够监听 action 完成事件

```js
export default {
  // ...
  actions: {
    // 外部通过store.dispatch('actionA', { a: 1 }).then(res => { // action结束了 })
    async actionA(context, payload) {
      const { commit } = context
      const res = await getDataFromNet(...payload)
      commit('mutationA', res)
    }
  }
}
```

- 使用 mapActions 辅助函数

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
      'increment',
      // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
      'incrementBy'
    ]),
    ...mapActions({
      // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
      add: 'increment'
    })
  }
}
```

6. module 模块分离

- store 的比较简单时，state、getter、mutation、action 可以放在一起。后续代码量逐渐变多时，可以考虑把它们分离到单独的文件中
- 当应用变得特别复杂时，store 对象就有可能变得相当臃肿。此时可以按照指定的维度把 store 拆分成一个个小的 module，利于维护
- 如无特殊要求，应该把 module 的 namespace 设置为 true，避免响应与全局同名的 mutation 和 action，达到更好的封装独立性

```js
const moduleA = {
  namespace: true,
  // state是一个函数，让moduleA在模块重用的场景下也能正常工作（与Vue组件的data处理方式一致）
  state: () => { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  namespace: true,
  state: () => { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

- 使用 createNamespacedHelpers 辅助函数

```js
import { createNamespacedHelpers } from 'vuex'
// 解构时重命名，带上module对应的后缀
const { mapState: mapStateModuleA, mapActions: mapActionsModuleA } = createNamespacedHelpers('some/nested/moduleA')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapStateModuleA({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActionsModuleA(['foo', 'bar'])
  }
}
```

7. 不要在生产环境下使用 vuex 的 strict 严格模式（严格模式会深度监测状态树来检测不合规的状态变更），会影响性能

```js
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
})
```
