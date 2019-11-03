import defaultCollectionOptions from '../src/defaultCollectionOptions';

describe('defaultCollectionOptions', () => {
  test('has correct default transform', async () => {
    const frontmatter = { title: 'some text' };
    const result = defaultCollectionOptions.transform(
      frontmatter,
      'lorem ipsum'
    );
    expect(result).toEqual(frontmatter);
  });

  test('has correct default serialize', async () => {
    const result = defaultCollectionOptions.serialize;
    expect(result).toEqual({});
  });

  test('has correct default sort', async () => {
    const result = defaultCollectionOptions.sort;
    expect(result).toBeUndefined();
  });

  test('has correct default hook', async () => {
    const content = 'lorem ipsum';
    const result = defaultCollectionOptions.hook(content);
    expect(result).toEqual(content);
  });
});
