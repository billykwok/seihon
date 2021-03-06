import findAfter from 'unist-util-find-after';

import type { Node, Parent } from 'unist';

export default function sectionize<T extends Node, S extends Parent>(
  node: T,
  ancestors: S[],
  tagName: string,
  whitelist: string[]
): void {
  const start = node;
  const parent = ancestors[ancestors.length - 1];

  const isEnd = (n: T) => whitelist.indexOf(n.type) < 0;
  const end = (findAfter as (
    parent: Parent,
    start: Node,
    isEnd: (n: T) => boolean
  ) => Node)(parent, start, isEnd);

  const startIndex = parent.children.indexOf(start);
  const endIndex = parent.children.indexOf(end);

  const between = parent.children.slice(
    startIndex,
    endIndex > 0 ? endIndex : undefined
  );

  const section = {
    type: 'section',
    children: between,
    data: { hName: tagName },
  };

  parent.children.splice(startIndex, section.children.length, section);
}
