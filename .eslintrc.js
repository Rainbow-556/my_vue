module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['alloy', 'alloy/vue'],
  globals: {
    Vue: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [],
  rules: {
    'vue/component-tags-order': ['error', { order: [['template', 'script'], 'style'] }],
    'no-var': ['warn'],
    eqeqeq: ['warn']
  }
}
