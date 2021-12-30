import type { CollectionOptions } from './types';

const defaultCollectionOptions: CollectionOptions = {
  transform: (data) => data,
  filter: () => true,
  sort: undefined,
  serialize: {},
};

export default defaultCollectionOptions;
