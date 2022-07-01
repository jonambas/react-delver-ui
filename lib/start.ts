import { createServer } from 'vite';
import { makeConfig } from './makeConfig';
import type { InternalConfig } from './types';

export const start = async (
  config: InternalConfig,
  exit: (e: string) => void
) => {
  try {
    const viteConfig = makeConfig(config, 'development');

    const server = await createServer({
      ...viteConfig,
      server: {
        port: config.port,
        open: config.openBrowser,
        base: config.base,
        host: true
      }
    });

    await server.listen();
    server.printUrls();
  } catch (e) {
    exit(e);
  }
};
