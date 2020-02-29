module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'prettier',
    'plugin:vue/essential',
    'plugin:vue/base',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      classes: true,
      legacyDecorators: true,
      experimentalDecorators: true,
      experimentalObjectRestSpread: true
    },
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: ['prettier','vue','standard'],
  rules: {
    semi: [0],
    'no-unused-vars':[0]
  }
}
