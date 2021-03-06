import fs from 'fs';
import { resolve } from 'path';
import { pathToFileURL } from 'url';
import { build } from 'esbuild';
import pc from 'picocolors';
import type { InternalConfig } from './types';

export const green = pc.green;
export const dim = (s: string) => pc.dim(pc.white(s));
export const red = pc.red;
export const cyan = pc.cyan;
export const bold = pc.bold;

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
