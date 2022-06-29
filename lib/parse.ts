import fs from 'fs';
import { resolve } from 'path';
import { delve } from 'react-delver';
import { dim } from './utils';
import type { InternalConfig } from './types';

type Props = Array<{
  value: string | boolean | number;
  name: string;
}>;

type Instance = {
  name: string;
  spread: boolean;
  props: Props;
  from?: string;
  location: {
    file: string;
    line: number;
    character: number;
  };
};

type ProcessedResult = {
  name: string;
  count: number;
  instances: Array<Instance>;
};

const isModule = (string?: string): boolean => {
  return string ? !Boolean(string.match(/^[\.~\/]/)) : false;
};

export const parse = (config: InternalConfig) => {
  const result = delve(config) as ProcessedResult[];

  const dir = resolve(config.cwd, '.delverui');
  const filePath = resolve(config.cwd, '.delverui/data.json');

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  console.log(dim(`➜ Found ${result.length} unique components`));

  const enriched = result.reduce((acc: any, component: ProcessedResult) => {
    const instances = component.instances;
    const sameFrom = instances.every((v, i, a) => v.from === a[0].from);
    const firstFrom = instances[0].from;

    // Move to node api
    acc.push({
      ...component,
      from: sameFrom ? firstFrom : 'mixed',
      module: sameFrom ? isModule(firstFrom) : 'mixed'
    });
    return acc;
  }, [] as ProcessedResult[]);

  fs.writeFileSync(filePath, JSON.stringify(enriched), {
    encoding: 'utf-8'
  });
};
