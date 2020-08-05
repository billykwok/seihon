# @seihon/macro

[![npm version](https://badgen.net/npm/v/@seihon/macro)](https://www.npmjs.com/package/@seihon/macro)
[![download](https://badgen.net/npm/dm/@seihon/macro)](https://www.npmjs.com/package/@seihon/macro)
[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org)
[![License](https://badgen.net/npm/license/@seihon/macro)](https://github.com/billykwok/seihon/blob/master/LICENSE)
[![CircleCI](https://circleci.com/gh/billykwok/seihon/tree/master.svg?style=svg)](https://circleci.com/gh/billykwok/seihon/tree/master)

> Seihon【製本】(Bookbinding in Japanese) is a JavaScript toolkit that improves your MDX transformation pipeline. It allows you to quickly transform MDX documents into a collection (like turning codices into book).
>
> More importantly, this toolkit is the last piece of the puzzle that enables code-splitted CMS-less MDX-based static site generation.

`@seihon/macro` is a [`babel-macro`](https://github.com/kentcdodds/babel-plugin-macros) that transpiles `collection<Item>('../example.collection.js')` into `require('../example.collection.js')`.

- It allows you to avoid using require directly in your code.

- Additionally, this gives you the ability to type check your Seihon collections.

## Usage

This is an example of using `@seihon/macro` alone. For a complete example of the entire Seihon toolkit, please refer to the main [`README.md`](https://github.com/billykwok/seihon).

```javascript
// src/components/home.jsx
import React from 'react';
import collection from '@seihon/macro';

const posts = collection('../content/posts/collection.config.js');

export default function Blog() {
  return posts.map(({ postId, minRead }) => (
    <PostPreview postId={postId} minRead={minRead} />
  ));
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
