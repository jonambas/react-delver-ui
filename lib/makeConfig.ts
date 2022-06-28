import webpack, { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve } from 'path';
import type { InternalConfig } from './types';

export const makeConfig = (
  config: InternalConfig,
  options: { production?: boolean }
): Configuration => {
  const includePaths = [resolve(config.root, 'src')];
  const isProduction = options.production;
  const mode = isProduction ? 'production' : 'development';
  const devServerEntries = isProduction
    ? []
    : [
        'webpack/hot/dev-server',
        'webpack-dev-server/client/index.js?hot=true&live-reload=true?logging=none'
      ];

  return {
    mode,
    entry: {
      main: [...devServerEntries, resolve(config.root, 'src/index.tsx')]
    },
    output: {
      filename: isProduction ? '[name].[contenthash:8].js' : '[name].js',
      chunkFilename: isProduction
        ? '[name].[contenthash:8].chunk.js'
        : '[name].chunk.js',
      path: resolve(config.cwd, config.outputPath)
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
      alias: {
        react: resolve(config.cwd, 'node_modules/react'),
        'react-dom': resolve(config.cwd, 'node_modules/react-dom')
      }
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          include: includePaths,
          exclude: /node_modules/,
          use: {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx'
            }
          },
          resolve: {
            fullySpecified: false
          }
        },
        {
          test: /\.m?js/,
          include: includePaths,
          exclude: /node_modules/,
          // See https://github.com/webpack/webpack/issues/11467
          resolve: {
            fullySpecified: false
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __delverConfig: JSON.stringify(config)
      }),
      ...(!isProduction ? [new webpack.HotModuleReplacementPlugin()] : []),
      new HtmlWebpackPlugin({
        title: config.title ? config.title : 'React Delver UI',
        chunks: ['main'],
        filename: 'index.html'
        // favicon: resolve(root, 'src/favicon.png')
      }),
      // Hack to make React 17/18 work together
      ...(config.use18
        ? []
        : [
            new webpack.IgnorePlugin({
              resourceRegExp: /react-dom\/client$/
            })
          ])
    ],
    devtool: isProduction ? 'source-map' : 'eval-cheap-source-map',
    stats: 'minimal'
  };
};
