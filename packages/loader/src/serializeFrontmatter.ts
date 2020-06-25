export default function serializeFrontmatter(
  data: Record<string, unknown>,
  serialize: Record<string, (value: any, context: string) => string>,
  context: string
): string {
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
