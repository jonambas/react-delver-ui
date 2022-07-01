export {};

declare global {
  type Config = import('../../types').Config;
  type Internal = import('../../types').InternalConfig;
  interface Window {
    __delverConfig: Config & Internal;
  }
  export const __delverConfig: Config & Internal;
}
