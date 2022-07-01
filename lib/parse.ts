import fs from 'fs';
import { resolve } from 'path';
import { delve, Result } from 'react-delver';
import { dim } from './utils';
import type { InternalConfig } from './types';

export const parse = (config: InternalConfig) => {
  const result = delve(config) as Result[];

  const dir = resolve(config.cwd, '.delverui');
  const filePath = resolve(config.cwd, '.delverui/data.json');

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  console.log(dim(`➜ Found ${result.length} unique components`));

  fs.writeFileSync(filePath, JSON.stringify(result), {
    encoding: 'utf-8'
  });
};
