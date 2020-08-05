import { describe, test, expect } from '@jest/globals';
import unified from 'unified';
import remark from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';
import prettier from 'prettier';
import { source } from 'common-tags';
import sectionize from '../src';

function process(options?: any) {
  return (literals: TemplateStringsArray, ...placeholders: any[]) => {
    return unified()
      .use(remark)
      .use(sectionize, options)
      .use(remark2rehype)
      .use(html)
      .processSync(
        prettier.format(source(literals, ...placeholders), {
          parser: 'markdown',
        })
      )
      .toString();
  };
}

describe('sectionize', () => {
  test('regular layout', () => {
    expect(
      process()`
        # Title

        Overview

        ## Subheading 1

        Lorem Ipsum

        [Img](https://google.com/abc.png)

        ## Subheading 2

        Lorem Ipsum

        ## Subheading 3

        * item 1
        * item 2
      `
    ).toMatchSnapshot();
  });

  test('layout with consecutive paragraphs and images', () => {
    expect(
      process()`
        # Title

        Overview

        ## Subheading 1

        Lorem Ipsum

        [Img1](https://google.com/abc.png)
        [Img2](https://google.com/abc.png)

        ## Subheading 2

        Lorem Ipsum 1

        Lorem Ipsum 2

        ## Subheading 3

        * item 1
        * item 2
      `
    ).toMatchSnapshot();
  });

  test('layout with custom tag', () => {
    expect(
      process({ tagName: 'custom' })`
        # Title

        Overview

        ## Subheading 1

        Lorem Ipsum

        [Img](https://google.com/abc.png)

        ## Subheading 2

        Lorem Ipsum

        ## Subheading 3

        * item 1
        * item 2
      `
    ).toMatchSnapshot();
  });

  test('layout with whitelist elements', () => {
    expect(
      process({ whitelist: ['heading'] })`
        # Title

        Overview

        ## Subheading 1

        Lorem Ipsum

        [Img](https://google.com/abc.png)

        * item 1
        * item 2
      `
    ).toMatchSnapshot();
  });

  test('layout with customed whitelist elements 1', () => {
    expect(
      process({ whitelist: ['heading', 'blockquote'] })`
        Overview

        > Lorem Ipsum

        Lorem Ipsum

        [Img](https://google.com/abc.png)

        * item 1
        * item 2
      `
    ).toMatchSnapshot();
  });

  test('layout with customed whitelist elements 2', () => {
    expect(
      process({ whitelist: ['heading', 'blockquote'] })`
        > Lorem Ipsum

        Lorem Ipsum

        [Img](https://google.com/abc.png)

        * item 1
        * item 2
      `
    ).toMatchSnapshot();
  });
});
