export type Options = {
  tagName?: string;
  whitelist?: string[];
};

const defaultOptions: Options = {
  tagName: 'section',
  whitelist: ['paragraph', 'list']
};

export default defaultOptions;
