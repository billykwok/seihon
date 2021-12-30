import deepmerge from 'deepmerge';
import fs from 'fs';
import highland from 'highland';
import klaw from 'klaw';
import matter from 'gray-matter';
import path from 'path';
import type { LoaderContext } from 'webpack';

import defaultCollectionOptions from './defaultCollectionOptions';
import matchPath from './matchPath';
import serializeFrontmatter from './serializeFrontmatter';
import type { CollectionOptions, Options } from './types';

const readFile = highland.wrapCallback(
  (
    path: string,
    callback: (err: Error, callback: { path: string; data: Buffer }) => void
  ) => fs.readFile(path, (err, data) => callback(err, { path, data }))
) as (
  path: string,
  ...rest: unknown[]
) => Highland.Stream<{ path: string; data: Buffer }>;

export default function collectionLoader(this: LoaderContext<any>): void {
  const callback = this.async();
  this.cacheable();
  this.addDependency(this.resourcePath);

  const { esModule, parallel } = deepmerge.all<Options>([
    { esModule: true, parallel: 10 },
    (this.getOptions() as Partial<Options>) || {},
  ]);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const parsed = require(this.resourcePath) as
    | CollectionOptions
    | { default: CollectionOptions };
  const { transform, filter, sort, serialize } = deepmerge(
    defaultCollectionOptions,
    'default' in parsed ? parsed.default : parsed
  );

  let streams = highland(
    klaw(this.context) as unknown as Highland.Stream<klaw.Item>
  )
    .filter((f) => !f.stats.isDirectory() && matchPath(f.path, /\.mdx?$/gi))
    .map((item, ...rest) => {
      this.addDependency(item.path);
      return readFile(item.path, ...rest);
    })
    .parallel(parallel)
    .map(({ path: mdxPath, data: mdxContent }) => {
      const { data, content } = matter(mdxContent);
      return { frontmatter: data, markdown: content, path: mdxPath };
    })
    .filter(filter)
    .map(({ frontmatter, markdown, path }) => ({
      path,
      data: transform(frontmatter, markdown, path),
    }));

  if (sort) {
    streams = streams.sortBy(sort);
  }

  const exportCode = esModule ? 'export default ' : 'module.exports=';
  return streams
    .map(({ path: mdxPath, data: mdxData }) =>
      serializeFrontmatter(mdxData, serialize, path.dirname(mdxPath))
    )
    .toArray((it) => callback(null, `${exportCode}[${it.join(',')}];\n`));
}
