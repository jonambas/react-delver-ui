import 'styled-components';

declare module 'styled-components' {
  // TODO
  export type DefaultTheme = {
    fontSizes: Record<string, any>;
    colors: Record<string, any>;
    fonts: Record<string, any>;
  };
}
