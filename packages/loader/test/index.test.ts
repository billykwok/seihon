import path from 'path';
import compile from './compiler';

describe('sectionize', () => {
  test('Inserts name and outputs JavaScript', async () => {
    const stats = await compile(path.resolve(__dirname, './test.mdx'));
    const output = stats.toJson().modules[1].modules[0].source;
    expect(output).toMatchSnapshot();
  });
});
