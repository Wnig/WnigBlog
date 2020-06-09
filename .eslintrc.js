module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-useless-escape': 0, // 不允许在字符串和正则表达式中使用无意义的换行符
    'space-infix-ops': 0,
    'no-sparse-arrays': 0, // 禁止稀疏数组[1,,2]
    'no-new': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-unary-ops': 0 // 一元运算结尾需要有空格
  }
}
