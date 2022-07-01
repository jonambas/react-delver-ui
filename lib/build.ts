import { build as viteBuild } from 'vite';
import { resolve } from 'path';
import { makeConfig } from './makeConfig';
import type { InternalConfig } from './types';

export const build = async (
  config: InternalConfig,
  exit: (e: string) => void
) => {
  try {
    const viteConfig = makeConfig(config, 'production');
    await viteBuild({
      ...viteConfig,
      build: {
        outDir: resolve(config.cwd, config.outputPath),
        rollupOptions: {}
      }
    });
  } catch (e) {
    exit(e);
  }
};
