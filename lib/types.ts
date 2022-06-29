import type { Config as ParserConfig } from 'react-delver';

export type UserConfig = ParserConfig & {
  title?: string;
  port?: number;
  openBrowser?: boolean;
  outputPath?: string;
  base?: string;
};

export type InternalConfig = UserConfig & {
  use18?: boolean;
  cwd?: string;
  root?: string;
};
