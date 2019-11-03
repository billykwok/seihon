import path from 'path';

export default function matchPath(filepath: string, regex: RegExp) {
  const result = regex.exec(path.extname(filepath));
  return result && result.length > 0;
}
