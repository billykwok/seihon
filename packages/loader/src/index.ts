import path from 'path';
import fs from 'fs';
import klaw from 'klaw';
import highland from 'highland';
import matter from 'gray-matter';
import deepmerge from 'deepmerge';
import { getOptions } from 'loader-utils';

import defaultCollectionOptions from './defaultCollectionOptions';
import resolveFile from './resolveFile';
import serializeFrontmatter from './serializeFrontmatter';
import matchPath from './matchPath';
import getDefaultOptions from './getDefaultOptions';

import type { loader } from 'webpack';
import type { Options, CollectionOptions } from './types';

type SortableStream<T> = Highland.Stream<T> & {
  sortBy: (f: <T>(a: T, b: T) => number) => SortableStream<T>;
};

const readFile = highland.wrapCallback(
  (
    path: string,
    callback: (err: Error, callback: { path: string; data: Buffer }) => void
  ) => fs.readFile(path, (err, data) => callback(err, { path, data }))
) as (
  path: string,
  ...rest: unknown[]
) => Highland.Stream<{ path: string; data: Buffer }>;

export default function collectionLoader(
  this: loader.LoaderContext,
  src: string
): void {
  const callback = this.async();
  this.cacheable();
  const { name, parallel } = deepmerge.all<Options>([
    getDefaultOptions(path.extname(this.resourcePath)),
    getOptions(this) || {},
  ]);

  if (matchPath(this.resourcePath, /\.mdx?$/gi)) {
    const collectionOptionFile = resolveFile(this, name);
    this.addDependency(collectionOptionFile);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const collectionOptions = require(collectionOptionFile) as CollectionOptions;
    const { transform, serialize, hook } = deepmerge(
      defaultCollectionOptions,
      collectionOptions
    );

    const { data, content } = matter(src);
    const transformedData = transform(data as Record<string, unknown>, content);

    const fm = serializeFrontmatter(transformedData, serialize, this.context);
    const code = hook(`\n${content}\n\nexport const frontmatter = ${fm};\n`);
    this.addDependency(this.resourcePath);
    return callback(null, code);
  } else if (matchPath(this.resourcePath, /\.(jsx?|tsx?)$/gi)) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const parsed = require(this.resourcePath) as
      | CollectionOptions
      | { default: CollectionOptions };
    const collectionOptions = 'default' in parsed ? parsed.default : parsed;
    const { transform, sort, serialize, hook } = deepmerge(
      defaultCollectionOptions,
      collectionOptions
    );

    this.addDependency(this.resourcePath);
    const stream = klaw(this.context) as unknown;
    let streams = (highland(stream as Highland.Stream<klaw.Item>)
      .filter((f) => !f.stats.isDirectory() && matchPath(f.path, /\.mdx?$/gi))
      .map((item, ...rest) => {
        this.addDependency(item.path);
        return readFile(item.path, ...rest);
      })
      .parallel(parallel)
      .map(({ path: mdxPath, data: mdxContent }) => {
        const { data, content } = matter(mdxContent);
        const transformedData = transform(data, content);
        return { path: mdxPath, data: transformedData };
      }) as unknown) as SortableStream<{
      path: string;
      data: any;
    }>;
    if (sort) {
      streams = streams.sortBy(sort);
    }
    return streams
      .map(({ path: mdxPath, data: mdxData }) =>
        serializeFrontmatter(mdxData, serialize, path.dirname(mdxPath))
      )
      .toArray((data) =>
        callback(null, hook(`export default [${data.join(',')}];\n`))
      );
  }
  throw new Error('Unsupported file type');
}
