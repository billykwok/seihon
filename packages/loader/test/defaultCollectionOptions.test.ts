import defaultOptions from '../src/defaultCollectionOptions';

describe('defaultCollectionOptions', () => {
  test('has correct default transform', () => {
    const frontmatter = { title: 'some text' };
    const result = defaultOptions.transform(frontmatter, 'lorem ipsum');
    expect(result).toEqual(frontmatter);
  });

  test('has correct default serialize', () => {
    expect(defaultOptions.serialize).toEqual({});
  });

  test('has correct default sort', () => {
    expect(defaultOptions.sort).toBeUndefined();
  });

  test('has correct default hook', () => {
    const content = 'lorem ipsum';
    expect(defaultOptions.hook(content)).toEqual(content);
  });
});
