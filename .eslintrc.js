module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-trailing-spaces': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'padded-blocks': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'quotes': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-self-closing': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/multiline-html-element-content-newline': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  }
}
