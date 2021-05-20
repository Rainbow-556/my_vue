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

### 核心概念

![alt 属性文本](./vuex.png)

1. store
   - 就是一个容器，它包含着你的应用中大部分全局共享的状态 (state)
2. state
   - 共享的状态具体存放的地方。通过 store.state.xxx 访问具体的 xxx 数据
3. getters
   - 可以认为是 store 的 computed 计算属性。getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算
4. mutation
   - 唯一能改变 state 的方式。可通过 store.commit('mutationType', payload)改变 state

### 常见场景下如何使用

### 使用 webpack 的 require.context()方法实现自动注册 vuex 的所有 module、module 里的 mutation、action、getters