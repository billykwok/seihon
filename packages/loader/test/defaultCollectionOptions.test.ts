import { describe, expect, test } from '@jest/globals';

import defaultOptions from '../src/defaultCollectionOptions';

describe('defaultCollectionOptions', () => {
  test('has correct default transform', () => {
    const frontmatter = { title: 'some text' };
    const result = defaultOptions.transform({
      frontmatter,
      markdown: 'lorem ipsum',
      filepath: './some.mdx',
    });
    expect(result).toEqual(frontmatter);
  });

  test('has correct default hook', () => {
    expect(defaultOptions.filter(null)).toEqual(true);
  });

  test('has correct default sort', () => {
    expect(defaultOptions.sort).toBeUndefined();
  });

  test('has correct default serialize', () => {
    expect(defaultOptions.serialize).toEqual({});
  });
});
