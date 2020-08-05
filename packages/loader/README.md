# @seihon/loader

[![npm version](https://badgen.net/npm/v/@seihon/loader)](https://www.npmjs.com/package/@seihon/loader)
[![download](https://badgen.net/npm/dm/@seihon/loader)](https://www.npmjs.com/package/@seihon/loader)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org)
[![License](https://badgen.net/npm/license/@seihon/loader)](https://github.com/billykwok/seihon/blob/master/LICENSE)
[![CircleCI](https://circleci.com/gh/billykwok/seihon/tree/master.svg?style=svg)](https://circleci.com/gh/billykwok/seihon/tree/master)

> Seihon【製本】(Bookbinding in Japanese) is a JavaScript toolkit that improves your MDX transformation pipeline. It allows you to quickly transform MDX documents into a collection (like turning codices into book).
>
> More importantly, this toolkit is the last piece of the puzzle that enables code-splitted CMS-less MDX-based static site generation.

`@seihon/loader` is a [`webpack`](https://github.com/webpack/webpack) loader that collects [`frontmatter`](https://github.com/jxson/front-matter) from all MDX documents and transforms them into one single object.

- It allows you to statically generate Table of Content, Blog Directory, Project List, or anything that contains a collection of data derived from [`frontmatter`](https://github.com/jxson/front-matter), without manual maintenance. You can even paginate the result using query parameters.

- Additionally, this loader allows you to transform frontmatter into actually content in the markdown part of the MDX document.

> In most occasions, you need to use this toolkit together with [`webpack`](https://github.com/webpack/webpack), [`@mdx-js/loader`](https://github.com/mdx-js/mdx/tree/master/packages/loader), [`babel-loader`](https://github.com/babel/babel-loader) and [`loadable-components`](https://github.com/smooth-code/loadable-components) in order to build a complete CMS-less static site that automatically.

## Usage

This is an example of using `@seihon/loader` alone. For a complete example of the entire Seihon toolkit, please refer to the main [`README.md`](https://github.com/billykwok/seihon).

Although Seihon makes no assumption about your project structure, it's always easier to explain its usage with one. Take the following structure as an example.

```text
my-site/
  src/
    components/
      home.jsx
      post.jsx
      ...
    content/
      posts/
        introducing-seihon/
          index.mdx
          ...
        effective-javascript/
          index.mdx
          ...
        collection.config.js
      projects/
        ...
        collection.config.js
    ...
  webpack.config.js
  ...
```

```javascript
// webpack.config.js
import sectionize from '@seihon/sectionize';
// ...
module: {
  rules: [
    {
      test: /\.mdx?$/,
      use: ['babel-loader', '@mdx-js/loader', '@seihon/loader']
    },
    {
      test: /collection\.config\.js$/,
      use: ['babel-loader', '@seihon/loader']
    }
    // ...
  ];
}
```

```frontmatter
// src/content/posts/introducing-seihon.mdx

---
title: Introducing Seihon
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

```frontmatter
// src/content/posts/effective-javascript.mdx

---
title: Effective JavaScript
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

```javascript
// src/content/{posts,projects}/collection.config.js
module.exports = {
  transform: (frontmatter, text) => {
    ...frontmatter,
    postId: frontmatter.title
      .replace(/[^0-9a-zA-Z\s]/gi, '')
      .replace(/\s+/gi, '-')
      .toLowerCase(),
    minRead: Math.ceil(text.split(' ').length / 200)
  }
};
```

```javascript
// src/components/home.jsx
import React from 'react';
import collection from '../content/posts/collection.config.js';

export default function Blog() {
  return collection.map(({ postId, minRead }) => (
    <PostPreview postId={postId} minRead={minRead} />
  ));
}
```

```javascript
// src/components/post.jsx
import React from 'react';
import loadable from '@loadable/component';
import { MDXProvider } from '@mdx-js/react';

const Markdown = loadable.lib((props: Props) =>
  import(
    /* webpackInclude: /\.mdx?$/i */
    `../../content/blog/${props.postId}`
  )
);

// postId can be extracted from URL segment using your favorite routing library, e.g. example.com/blog/lorem-ipsum-1
export default function Post({ postId, ...props }) {
  return (
    <MDXProvider>
      <Markdown postId={postId}>
        {({ default: Component, frontmatter }) => <Component {...props} />}
      </Markdown>
    </MDXProvider>
  );
}
```

## Support

This library has been continuously used in many of my personal projects, and is regarded as production-ready. In the foreseeable future, I will continuously maintain and support this library.

## Issues and Feedback

Please voice your opinion and report bugs in the [issues](https://github.com/billykwok/seihon/issues) sections of this GitHub project.

## Contributing

You are more than welcome to add more functionalities, improve documentation, fix bugs, and anything you think is needed. The build step is pretty self-explanatory. Please refer to [CONTRIBUTING.md](https://github.com/billykwok/seihon/blob/master/CONTRIBUTING.md) for more details.

## License

MIT
