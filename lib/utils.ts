import fs from 'fs';
import { resolve } from 'path';
import { pathToFileURL } from 'url';
import { build } from 'esbuild';
import boxen from 'boxen';
import chalk from 'chalk';
import type { InternalConfig } from './types';

export const green = chalk.hex('#25F578');
export const gray = chalk.gray;
export const red = chalk.hex('#FF5252');

type PrettyStartArgs = {
  port: string | number;
  v4: string;
  duration?: number;
};

export const prettyStart = ({ port, v4, duration }: PrettyStartArgs): void => {
  const header = green('Libby is running at');
  const local = green(`▸ Local     http://localhost:${port}/`);
  const network = green(`▸ Network   http://${v4}:${port}/`);
  // const time = gray(`Started in ${(duration / 1000).toFixed(2)}s.`);
  const output = `${header}\n${local}\n${network}`;
  console.log(boxen(output, { padding: 1, borderColor: '#25F578' }) + '\n');
};

// export const prettyBuild = ({ duration, path }) => {
//   const header = green(`Libby built in ${(duration / 1000).toFixed(2)}s`);
//   const loc = green(`▸ ${path}`);
//   const npx = gray(`npx serve ${path}`);
//   const output = `${header}\n${loc}\n${npx}`;
//   console.log(boxen(output, { padding: 1, borderColor: '#25F578' }) + '\n');
// };

export const logError = (err: string): void => {
  console.log(red(`React Delver UI Error\n\n${err}`));
};

export const shouldUse18 = (cwd: string): boolean => {
  const { version } = JSON.parse(
    fs.readFileSync(resolve(cwd, 'node_modules/react-dom/package.json'), {
      encoding: 'utf-8'
    })
  );
  return version && (version.startsWith('18') || version.startsWith('0.0.0'));
};

const dynamicImport = new Function('file', 'return import(file)');

const bundleConfigFile = async (fileName: string): Promise<string> => {
  const result = await build({
    absWorkingDir: process.cwd(),
    entryPoints: [fileName],
    outfile: 'out.js',
    write: false,
    platform: 'node',
    bundle: true,
    format: 'cjs',
    sourcemap: false
  });

  return result.outputFiles[0].text;
};

export const loadConfigFromFile = async (
  configPath: string,
  exit: () => void
): Promise<InternalConfig> => {
  try {
    const fileUrl = pathToFileURL(configPath);
    const bundled = await bundleConfigFile(configPath);
    fs.writeFileSync(configPath + '.bundled.js', bundled);
    const userConfig = (await dynamicImport(`${fileUrl}.bundled.js`)).default;
    fs.unlinkSync(configPath + '.bundled.js');
    return userConfig.default;
  } catch (e) {
    logError(e);
    exit();
  }
};
