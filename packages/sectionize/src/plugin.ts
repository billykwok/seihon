import visit from 'unist-util-visit-parents';
import deepmerge from 'deepmerge';
import defaultOptions from './defaultOptions';
import isFirstInSection from './isFirstInSection';
import sectionize from './sectionize';

import type { Node, Parent } from 'unist';
import type { Options } from './types';

function plugin<T extends Node>(options = defaultOptions): (tree: T) => void {
  return (tree: T): void => {
    const { tagName, whitelist } = deepmerge.all<Options>([
      defaultOptions,
      options,
    ]);
    visit(tree, isFirstInSection(whitelist), (node, ancestors) =>
      sectionize(node, ancestors as Parent[], tagName, whitelist)
    );
  };
}

export default plugin;
