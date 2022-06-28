import fs from 'fs';
import { resolve } from 'path';
import { delve } from 'react-delver';
import type { InternalConfig } from './types';

export const parse = (config: InternalConfig) => {
  const result = delve(config);

  const dir = resolve(config.cwd, '.delverui');
  const filePath = resolve(config.cwd, '.delverui/data.json');

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(filePath, JSON.stringify(result), {
    encoding: 'utf-8'
  });
};
