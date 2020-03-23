type Options = {
  transform?: (data: { [property: string]: any }, content?: string) => any;
  sort?: (a: any, b: any) => number;
  serialize?: { [property: string]: (value: any, context: string) => string };
  hook?: (output: string) => string;
};

const defaultCollectionOptions: Options = {
  transform: (data) => data,
  sort: undefined,
  serialize: {},
  hook: (output) => output,
};

export default defaultCollectionOptions;
