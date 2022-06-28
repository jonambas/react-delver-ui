import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { start } from './start';
import { parse } from './parse';
// import build from './build';
import rimraf from 'rimraf';
import { shouldUse18, logError, loadConfigFromFile } from './utils';
import type { InternalConfig } from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, '..');

const makeDefaultConfig = (userConfig: InternalConfig): InternalConfig => {
  return {
    port: 9000,
    outputPath: 'dist/delver-ui',
    openBrowser: false,
    include: [
      '**/*.{jsx,tsx,js,ts}',
      '!**/*.stories.{jsx,tsx,js,ts}',
      '!**/node_modules',
      '!**/dist'
    ],
    ...userConfig
  };
};

type Args = {
  configPath: string;
  cwd: string;
};

type Exit = () => void;

type Return = Promise<{
  start: () => void;
  build: () => void;
}>;

type Lib = (args: Args, exit: Exit) => Return;

export const lib: Lib = async ({ configPath, cwd }, exit) => {
  const use18 = shouldUse18(cwd);
  const userConfig = await loadConfigFromFile(configPath, exit);
  const config = makeDefaultConfig({ ...userConfig, cwd, use18, root });

  parse(config);

  const handleError = (err) => {
    if (err) {
      logError(err);
      exit();
    }
  };

  return {
    start: () => {
      start(config, handleError);
    },
    build: () => {
      rimraf.sync(config.outputPath);
      // build(config, handleError);
    }
  };
};
