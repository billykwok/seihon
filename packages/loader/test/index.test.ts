import path from 'path';
import prettier from 'prettier';
import { describe, expect, test } from '@jest/globals';

import compile from './compiler';

describe('loader', () => {
  test('generates collection', async () => {
    const stats = await compile(path.resolve(__dirname, './seihon.config.js'));
    const output = stats.toJson({ source: true }).modules[0].source as string;
    expect(prettier.format(output, { parser: 'babel' })).toMatchSnapshot();
  }, 30000);
});
