import type { CollectionOptions } from './types';

const defaultCollectionOptions: CollectionOptions = {
  transform: (data) => data,
  sort: undefined,
  serialize: {},
  hook: (output) => output,
};

export default defaultCollectionOptions;
