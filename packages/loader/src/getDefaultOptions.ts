import type { Options } from './types';

function getDefaultOptions(ext: string): Options {
  return {
    name: `collection.config${/^\.(js|ts)$/.exec(ext) ? ext : '.js'}`,
    parallel: 10,
  };
}

export default getDefaultOptions;
