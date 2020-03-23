module.exports = {
  babelrcRoots: ['.', 'packages/*'],
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    [
      '@babel/preset-typescript',
      {
        isTSX: true,
        allExtensions: true,
        allowNamespaces: true,
        allowDeclareFields: true,
        onlyRemoveTypeImports: true,
      },
    ],
    '@babel/preset-react',
  ],
};
