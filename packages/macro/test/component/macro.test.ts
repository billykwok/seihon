import { describe, test, expect } from '@jest/globals';
import { transformAsync } from '@babel/core';

const babelConfig: {
  filename: string;
  configFile: false;
  babelrc: false;
  presets: any[];
  plugins: any[];
} = {
  filename: __filename,
  configFile: false,
  babelrc: false,
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    'babel-plugin-macros',
    ['@babel/plugin-transform-modules-commonjs', { strictMode: false }],
  ],
};

describe('macros', () => {
  test('convert macro to require', async () => {
    const tranformed = await transformAsync(
      `
        import collection from '../../lib/macro';
        const docs = collection('some/directory/docs.collection.js');
      `,
      babelConfig
    );
    expect(tranformed.code.trim()).toEqual(
      'var docs = require("some/directory/docs.collection.js");'
    );
  });

  test('evaluate template literal', async () => {
    const tranformed = await transformAsync(
      `
        import collection from '../../lib/macro';
        const filename = 'docs.collection.js';
        const path = \`some/directory/\${filename}\`;
        const docs = collection(path);
      `,
      babelConfig
    );
    expect(tranformed.code.trim()).toEqual(
      'var filename = \'docs.collection.js\';\nvar path = "some/directory/".concat(filename);\n\nvar docs = require("some/directory/docs.collection.js");'
    );
  });
});
