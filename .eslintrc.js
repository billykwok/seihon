const path = require('path');

module.exports = {
  env: {
    commonjs: true,
    amd: true,
    es6: true,
    node: true,
    browser: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    ecmaFeatures: { impliedStrict: true },
    project: './tsconfig.json'
  },
  settings: {
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
    'import/extensions': ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.json'],
    'import/resolver': {
      lerna: { packages: path.resolve(__dirname, 'packages') },
      node: {
        paths: [path.resolve(__dirname, 'node_modules')],
        moduleDirectory: ['node_modules']
      },
      webpack: { config: {} }
    }
  },
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/prefer-includes': 'off',
    'prefer-spread': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'consistent-return': 'off',
    'max-len': 'off',
    'no-console': 'off'
  }
};
