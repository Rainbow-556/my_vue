**Vuex 全局单例**

### flux 架构

- 架构图

### what how why

[链接](https://blog.csdn.net/qq_37003559/article/details/103578335?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.control)

- what：是什么，现象、成果
- how：方法、措施
- why：目的、理念

### state

- 调用

```js
store.state.stateA
```

- 显示声明在 state 里的属性才是响应式的，后续新增的属性则不是，显示声明属性的方式比较明了清晰。如果要实现动态新增属性，可以采取以下方式（不建议）

```js
mutations: {
  addNewProp(state, payload) {
    Vue.set(state, payload.name, payload.value)
  }
}
```

- mapState 和 mapGetters 辅助函数

```js
import { mapState, mapGetters } from 'vuex'

...
computed: {
  // 会把 $store.state.stateA 映射成代码里的 this.stateA 调用
  ...mapState(['stateA', 'stateB']),
  // 会把 $store.getters.getterA 映射成代码里的 this.getterA 调用
  ...mapGetters(['getterA', 'getterB'])
}
```

### getters

- 调用

```js
store.getters.getterA
```

### mutation

- 调用

```js
store.commit('mutationType')
```

- 是同步事务，按照 vuex 的规定，只能是个同步函数，不能包含异步的操作。因为 mutation 认为是改变状态的最终地方，像 VueDevTool 要记录状态改变前后的值，保存快照信息，如果是用异步的方式去改变状态，VueDevTool 并不知道异步回调何时执行，导致无法记录。vuex 的 plugin 就可以监听每次 mutation 的调用
- 如果是大型多人协作的项目，可以把 mutation 的字符串类型抽取到单独的文件中进行统一管理，这样就能清晰的知道项目里有哪些 mutation

```js
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

- mapMutations 辅助函数

```js
import { mapMutations } from 'vuex'

...
methods: {
  // 会把 $store.commit('mutationA') 映射成代码里的 this.mutationA() 调用
  ...mapMutations(['mutationA', 'mutationB'])
}
```

### action

- 支持异步操作，异步操作完后还是使用 commit mutation 来修改 state
- 调用

```js
store.dispatch('actionA', payload)
```

- store.dispatch()会返回 Promise，也可以在 action 中调用其他 action，配合 async/await 语法，在外部调用方可以在 action 处理完毕后做一些事情

```js
// 定义
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
// 调用
this.$store.dispatch('updateNameFromServer').then(() => {
  // action内的异步处理完成后执行
  console.log('action end', this.$store.state.name)
})
```
