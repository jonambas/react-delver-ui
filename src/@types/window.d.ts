export {};

declare global {
  type Config = import('../../types').Config;
  interface Window {
    __delverConfig: Config;
  }
}
