import { Node, Parent } from 'unist';

export default function isFirstInSection<T extends Node, S extends Parent>(
  whitelist: string[]
) {
  return (node: T, i: number, parent: S): node is T => {
    if (parent && 'root' !== parent.type) {
      return false;
    }
    if ('heading' === node.type) {
      return true;
    }
    if (
      whitelist.indexOf(node.type) > -1 &&
      (i === 0 ||
        (i > 0 &&
          ['heading', ...whitelist].indexOf(parent.children[i - 1].type) < 0))
    ) {
      return true;
    }
    return false;
  };
}
