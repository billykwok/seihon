const path = require('path');

module.exports = {
  env: {
    commonjs: true,
    amd: true,
    es6: true,
    node: true,
    browser: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
    ecmaFeatures: { impliedStrict: true },
    project: './tsconfig.json',
  },
  settings: {
    'import/extensions': ['.js', '.mjs', '.json'],
    'import/resolver': {
      lerna: { packages: path.resolve(__dirname, 'packages') },
      node: {
        paths: [path.resolve(__dirname, 'node_modules')],
        moduleDirectory: ['node_modules'],
      },
      webpack: { config: {} },
    },
  },
  plugins: ['import', 'prettier'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
  rules: {
    'prefer-spread': 'off',
    'consistent-return': 'off',
    'max-len': 'off',
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
        'import/extensions': ['.ts', '.tsx'],
      },
      plugins: ['@typescript-eslint', 'import', 'prettier'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:prettier/recommended',
        'prettier',
      ],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': [
          'error',
          { allowArgumentsExplicitlyTypedAsAny: true },
        ],
        '@typescript-eslint/prefer-includes': 'off',
        'prefer-spread': 'off',
        'consistent-return': 'off',
        'max-len': 'off',
        'no-console': 'off',
      },
    },
  ],
};
