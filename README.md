# <img src="https://raw.githubusercontent.com/billykwok/seihon/master/logo.png" width="240" alt="SEIHON" />

[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org)
[![codecov](https://codecov.io/gh/billykwok/seihon/branch/master/graph/badge.svg)](https://codecov.io/gh/billykwok/seihon)
[![CircleCI](https://circleci.com/gh/billykwok/seihon/tree/master.svg?style=svg)](https://circleci.com/gh/billykwok/seihon/tree/master)

Seihon【製本】(Bookbinding in Japanese) is a JavaScript toolkit that improves your MDX transformation pipeline. It allows you to quickly transform MDX documents into a collection (like turning codices into book).

More importantly, this toolkit is the last piece of the puzzle that enables code-splitted CMS-less MDX-based static site generation.

It currently consists of two libraries.

1. [`@seihon/loader`](https://github.com/billykwok/seihon/tree/master/packages/loader) is a [`webpack`](https://github.com/webpack/webpack) loader that collects [`frontmatter`](https://github.com/jxson/front-matter) from all MDX documents and transforms them into one single object. It allows you to statically generate Table of Content, Blog Directory, Project List, or anything that contains a collection of data derived from [`frontmatter`](https://github.com/jxson/front-matter), without manual maintenance. You can even paginate the result using query parameters.

2. [`@seihon/macro`](https://github.com/billykwok/seihon/tree/master/packages/macro) is a [`babel-macro`](https://github.com/kentcdodds/babel-plugin-macros) that transpiles `collection<Item>('../example.collection.js')` into `require('../example.collection.js')`.

> In most occasions, you need to use this toolkit together with [`webpack`](https://github.com/webpack/webpack), [`@mdx-js/loader`](https://github.com/mdx-js/mdx/tree/master/packages/loader), [`babel-loader`](https://github.com/babel/babel-loader) and [`loadable-components`](https://github.com/smooth-code/loadable-components) in order to build a code-splitted CMS-less MDX-based static site.

## Usage

This is an example of a complete usage of the Seihon library. For individual usage, please refer to their own README.md.

- [`@seihon/loader`](https://github.com/billykwok/seihon/tree/master/packages/loader)
- [`@seihon/macro`](https://github.com/billykwok/seihon/tree/master/packages/macro)

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
        seihon.config.js
      projects/
        ...
        seihon.config.js
    ...
  webpack.config.js
  ...
```

```javascript
// webpack.config.js
// ...
module: {
  rules: [
    {
      test: /seihon\.config\.js$/,
      use: ['babel-loader', '@seihon/loader'],
    },
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
// src/content/{posts,projects}/seihon.config.js
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
import seihon from '@seihon/macro';

const posts = seihon('../content/posts/seihon.config.js');

export default function Blog() {
  return posts.map(({ postId, minRead }) => (
    <PostPreview postId={postId} minRead={minRead} />
  ));
}
```

## Configuration

### Loader Options

`@seihon/loader` takes two options, which control the global behaviors.

```js
{
  esModule: true, // boolean - wether to emit the resulting frontmatter array in ES Module syntax
  parallel: 10 // number - the level of parallelism used when reading frontmatters from markdown files
}
```

The individual `seihon.config.js` determines how a specific collection of frontmatters is loaded. The filename `seihon.config.js` is just a convention. It can be changed to any name as you like.

```js
{
  transform: (frontmatter, markdownContent, filePath) => frontmatter, // function - allow custom transformation of frontmatter
  sort: (a, b) => a < b; // function - allow custom sorting of the list of frontmatters
  serialize: {}, // Record<string, data => string> - allow custom serialization of a specific key in the frontmatter
  hook: code => code // function - allow custom transformation of the final code right before emitting
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
