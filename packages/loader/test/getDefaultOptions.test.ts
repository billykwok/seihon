import { describe, test, expect } from '@jest/globals';
import getDefaultOptions from '../src/getDefaultOptions';

describe('default options', () => {
  test('for javascript', () => {
    const expected = {
      name: 'collection.config.js',
      esModule: true,
      parallel: 10,
    };
    expect(getDefaultOptions('.js')).toEqual(expected);
  });

  test('for typescript', () => {
    const expected = {
      name: 'collection.config.ts',
      esModule: true,
      parallel: 10,
    };
    expect(getDefaultOptions('.ts')).toEqual(expected);
  });

  test('for unknown', () => {
    const expected = {
      name: 'collection.config.js',
      esModule: true,
      parallel: 10,
    };
    expect(getDefaultOptions('abc')).toEqual(expected);
  });
});
