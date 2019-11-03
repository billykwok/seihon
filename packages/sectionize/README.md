# @seihon/sectionize

[![npm version](https://badgen.net/npm/v/@seihon/sectionize)](https://www.npmjs.com/package/@seihon/sectionize)
[![download](https://badgen.net/npm/dm/@seihon/sectionize)](https://www.npmjs.com/package/@seihon/sectionize)
[![minified size](https://badgen.net/bundlephobia/min/@seihon/sectionize)](https://bundlephobia.com/result?p=@seihon/sectionize)
[![GZip size](https://badgen.net/bundlephobia/minzip/@seihon/sectionize)](https://bundlephobia.com/result?p=@seihon/sectionize)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org)
[![Greenkeeper badge](https://badges.greenkeeper.io/billykwok/seihon.svg)](https://greenkeeper.io)
[![codecov](https://codecov.io/gh/billykwok/seihon/branch/master/graph/badge.svg)](https://codecov.io/gh/billykwok/seihon)
[![CircleCI](https://circleci.com/gh/billykwok/seihon/tree/master.svg?style=svg)](https://circleci.com/gh/billykwok/seihon/tree/master)

> Seihon【製本】(Bookbinding in Japanese) is a JavaScript toolkit that improves your MDX transformation pipeline. It allows you to quickly transform MDX documents into a collection (like turning codices into book).
>
> More importantly, this toolkit is the last piece of the puzzle that enables automatic generation of CMS-less MDX-based static site.

`@seihon/sectionize` is a [`unified`](https://github.com/unifiedjs/unified) plugin that divides a continuous piece of text into chunks wrapped by a customizable tag.

- To use it with [`@mdx-js/loader`](https://github.com/mdx-js/mdx/tree/master/packages/loader), you can add it to the `remarkPlugins` option.

- To use it with [`unified`](https://github.com/unifiedjs/unified), you just need to place this plugin into the `.use()` pipeline.

> In most occasions, you need to use this plugin together with [`unified`](https://github.com/unifiedjs/unified), or [`@mdx-js/loader`](https://github.com/mdx-js/mdx/tree/master/packages/loader) and [`babel-loader`](https://github.com/babel/babel-loader).

## Usage

This is an example of using `@seihon/section` alone. For a complete example of the entire Seihon toolkit, please refer to the main [`README.md`](https://github.com/billykwok/seihon/blob/master/README.md).

```javascript
// webpack.config.js
import sectionize from '@seihon/sectionize';
// ...
module: {
  rules: [
    {
      test: /\.mdx?$/,
      use: ['babel-loader', '@mdx-js/loader', '@seihon/loader']
    }
    // ...
  ];
}
```

```md
// src/content/posts/introducing-seihon.mdx

# Introducing Seihon

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Overview

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

- Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
- Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

```javascript
// src/components/post.jsx
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import Article from '../content/posts/introducing-seihon.mdx';

export default function Post() {
  return (
    <MDXProvider>
      <Article />
    </MDXProvider>
  );
}
```

Using the above config, you would obtain the following [`react`](https://reactjs.org/) rendering output.

```html
<section>
  <h1>Introducing Seihon</h1>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
  </p>
</section>
<section>
  <h1>Overview</h1>
  <p>
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.
  </p>
</section>
<section>
  <ul>
    <li>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur.
    </li>
    <li>
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
      deserunt mollit anim id est laborum.
    </li>
  </ul>
</section>
```

## Support

This library has been continuously used in many of my personal projects, and is regarded as production-ready. In the foreseeable future, I will continuously maintain and support this library.

## Issues and Feedback

Please voice your opinion and report bugs in the [issues](https://github.com/billykwok/seihon/issues) sections of this GitHub project.

## Contributing

You are more than welcome to add more functionalities, improve documentation, fix bugs, and anything you think is needed. The build step is pretty self-explanatory. Please refer to [CONTRIBUTING.md](https://github.com/billykwok/seihon/blob/master/CONTRIBUTING.md) for more details.

## License

MIT
