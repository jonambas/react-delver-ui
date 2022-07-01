export {};

declare global {
  type Config = import('../../types').Config;
  type Internal = import('../../types').InternalConfig;
  export const __delverConfig: Config & Internal;
}
