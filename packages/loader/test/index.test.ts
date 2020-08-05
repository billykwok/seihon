import { describe, test, expect } from '@jest/globals';
import path from 'path';
import prettier from 'prettier';
import compile from './compiler';

describe('loader', () => {
  test('transforms MDX', async () => {
    const stats = await compile(path.resolve(__dirname, './test.mdx'));
    const output = stats.toJson().modules[1].modules[0].source;
    expect(prettier.format(output, { parser: 'babel' })).toMatchSnapshot();
  }, 30000);

  test('generates collection', async () => {
    const stats = await compile(
      path.resolve(__dirname, './collection.config.js')
    );
    const output = stats.toJson().modules[0].source;
    expect(prettier.format(output, { parser: 'babel' })).toMatchSnapshot();
  }, 30000);
});
