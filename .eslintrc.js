// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    '@emotion'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'space-before-function-paren': 'off',
    'react/prop-types': 'off',
    'import/no-absolute-path': 'off',
    'react/no-unescaped-entities': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css', 'jsx'] }]
  }
}
