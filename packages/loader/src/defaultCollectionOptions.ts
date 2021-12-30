import type { CollectionOptions } from './types';

const defaultCollectionOptions: CollectionOptions = {
  transform: ({ frontmatter }) => frontmatter,
  filter: () => true,
  sort: undefined,
  serialize: {},
};

export default defaultCollectionOptions;
