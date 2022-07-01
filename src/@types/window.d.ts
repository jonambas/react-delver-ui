export {};

declare global {
  interface Window {
    __delverConfig: Record<any, any>;
  }
}
