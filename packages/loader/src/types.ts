export type CollectionOptions = {
  transform?: (
    data: Record<string, unknown>,
    content?: string,
    path?: string
  ) => Record<string, unknown>;
  sort?: (a: any, b: any) => number;
  serialize?: { [property: string]: (value: any, context: string) => string };
  hook?: (output: string) => string;
};

export type Options = { esModule: boolean; parallel: number };
