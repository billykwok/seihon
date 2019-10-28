import path from 'path';

export default function matchPath(filepath: string, regex: RegExp) {
  return regex.exec(path.extname(filepath)).length > 0;
}
