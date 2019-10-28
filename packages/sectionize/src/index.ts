import visit from 'unist-util-visit-parents';
import deepmerge from 'deepmerge';
import { Node, Parent } from 'unist';

import defaultOptions from './defaultOptions';
import isFirstInSection from './isFirstInSection';
import sectionize from './sectionize';

export default function plugin<T extends Node>(options = defaultOptions) {
  return (tree: T) => {
    const { tagName, whitelist } = deepmerge(defaultOptions, options);
    visit(tree, isFirstInSection(whitelist), (node, ancestors) =>
      sectionize(node, ancestors as Parent[], tagName, whitelist)
    );
  };
}
