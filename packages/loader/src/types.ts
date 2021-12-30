export type Item = {
  frontmatter: Record<string, unknown>;
  markdown: string;
  filepath: string;
};

export type CollectionOptions = {
  transform?: (item: Item) => Record<string, unknown>;
  filter?: (item: Item) => boolean;
  sort?: (a: Item, b: Item) => number;
  serialize?: { [property: string]: (value: any, context: string) => string };
};

export type Options = { esModule: boolean; parallel: number };
