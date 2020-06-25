import path from 'path';

export default function matchPath(filepath: string, regex: RegExp): boolean {
  const result = regex.exec(path.extname(filepath));
  return result && result.length > 0;
}
