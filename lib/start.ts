import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { makeConfig } from './makeConfig';
import type { InternalConfig } from './types';
import { prettyStart } from './utils';

export const start = async (
  config: InternalConfig,
  exit: (e: string) => void
) => {
  try {
    const webpackConfig = makeConfig(config, {
      production: false
    });

    const webpackDevServerConfig = {
      hot: false,
      client: false,
      port: config.port,
      compress: true,
      open: config.openBrowser
    };

    const compiler = webpack({
      ...webpackConfig,
      infrastructureLogging: {
        level: 'none' // Using a custom logger
      }
    });

    const devServer = new WebpackDevServer(webpackDevServerConfig, compiler);
    await devServer.start();

    const localIPv4 = await WebpackDevServer.internalIP('v4');

    const { server } = devServer;
    const address = server.address();

    prettyStart({
      port: typeof address !== 'string' ? address.port : '',
      v4: localIPv4
    });
  } catch (e) {
    exit(e);
  }
};
