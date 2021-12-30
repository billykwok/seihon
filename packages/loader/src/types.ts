export type CollectionOptions = {
  transform?: (
    frontmatter: Record<string, unknown>,
    markdown?: string,
    filepath?: string
  ) => Record<string, unknown>;
  filter?: (item: {
    frontmatter?: Record<string, unknown>;
    markdown?: string;
    filepath?: string;
  }) => boolean;
  sort?: (a: any, b: any) => number;
  serialize?: { [property: string]: (value: any, context: string) => string };
};

export type Options = { esModule: boolean; parallel: number };
