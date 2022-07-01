import { InlineConfig } from 'vite';
import { resolve } from 'path';
import type { InternalConfig } from './types';

export const makeConfig = (
  config: InternalConfig,
  mode: 'development' | 'production'
): InlineConfig => {
  return {
    mode: mode,
    configFile: false,
    root: config.root,
    resolve: {
      alias: {
        '@src': resolve(config.root, 'src'),
        __delverData: resolve(config.cwd, '.delverui/data.json'),
        ...(config.use18
          ? {}
          : {
              'react-dom/client': resolve(
                config.root,
                'src/react-dom-client-placeholder.js'
              )
            })
      }
    },
    define: {
      __delverConfig: JSON.stringify(config)
    }
  };
};
