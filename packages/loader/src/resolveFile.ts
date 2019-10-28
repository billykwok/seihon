import path from 'path';
import fs from 'fs';
import Webpack from 'webpack';

export default function resolveFile(
  loader: Webpack.loader.LoaderContext,
  configFileName: string
) {
  let dir = loader.resourcePath;
  do {
    dir = path.dirname(dir);
    if (fs.existsSync(path.resolve(dir, configFileName))) break;
  } while (dir && dir.length > loader.rootContext.length);
  return path.resolve(dir, configFileName);
}
