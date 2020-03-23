export default function serializeFrontmatter(
  data: string,
  serialize: { [property: string]: (value: any, context: string) => string },
  context: string
) {
  return (
    '{' +
    Object.keys(data)
      .map((key) => {
        const value =
          key in serialize
            ? serialize[key](data[key], context)
            : JSON.stringify(data[key]);
        return `${key}:${value}`;
      })
      .join(',') +
    '}'
  );
}
