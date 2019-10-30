import path from 'path';
import webpack, { Stats } from 'webpack';

const loader = path.resolve(__dirname, '../src/index.ts');

export default function compile(entry: string, options = {}) {
  const compiler = webpack({
    mode: 'production',
    context: __dirname,
    entry,
    output: { path: path.resolve(__dirname, '../lib'), filename: 'bundle.js' },
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
      alias: { fs: 'memfs' }
    },
    externals: { react: 'react' },
    module: {
      rules: [
        { test: /custom\.js$/i, use: { loader, options } },
        { test: /collection\.js$/i, use: { loader, options } },
        {
          test: /\.mdx?$/,
          use: ['babel-loader', '@mdx-js/loader', { loader, options }]
        }
      ]
    }
  });

  return new Promise<Stats>((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) return reject(err);
      if (stats.hasErrors()) {
        return reject(new Error(stats.toJson().errors.toString()));
      }
      resolve(stats);
    });
  });
}
