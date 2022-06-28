import type { Config as ParserConfig } from 'react-delver';

export type Config = ParserConfig & {
  title?: string;
  port?: number;
  outputPath?: string;
  openBrowser?: boolean;
};
