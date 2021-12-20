import path from 'path';
import webpack from 'webpack';
import type { Stats } from 'webpack';

const loader = path.resolve(__dirname, '../src/index.ts');

export default function compile(entry: string, options = {}): Promise<Stats> {
  const compiler = webpack({
    mode: 'production',
    context: __dirname,
    entry,
    output: { path: path.resolve(__dirname, '../lib'), filename: 'bundle.js' },
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
      alias: { fs: 'memfs' },
    },
    externals: { react: 'react' },
    module: {
      rules: [{ test: /seihon\.config\.js$/i, use: { loader, options } }],
    },
  });

  return new Promise<Stats>((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) return reject(err);
      if (stats.hasErrors()) {
        console.dir(
          stats
            .toJson()
            .errors.map((it) => it.message)
            .join('\n')
        );
        return reject(
          new Error(
            stats
              .toJson()
              .errors.map((it) => it.message)
              .join('\n')
          )
        );
      }
      resolve(stats);
    });
  });
}
