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
        __delverData: resolve(config.cwd, '.delverui/data.json'),
        react: resolve(config.cwd, 'node_modules/react'),
        'react-dom': resolve(config.cwd, 'node_modules/react-dom')
      }
    },
    define: {
      __delverConfig: JSON.stringify(config)
    }
  };
};
