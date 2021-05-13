**Vuex 全局单例**

### 初始化

- 显示声明在 state 里的属性才是响应式的，后续新增的属性则不是，显示声明属性的方式比较明了清晰。如果要实现动态新增属性，可以采取以下方式（不建议）

```js
mutations: {
  addNewProp(state, payload) {
    Vue.set(state, payload.name, payload.value)
  }
}
```
