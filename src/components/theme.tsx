import React from 'react';
import { SweatpantsProvider } from '@sweatpants/theme';
import { createGlobalStyle } from 'styled-components';

const ss = document.createElement('link');
ss.setAttribute('rel', 'stylesheet');
ss.setAttribute('href', 'https://rsms.me/inter/inter.css');
document.head.appendChild(ss);

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.gray[1000]}
  }
  a {
    transition: 0.15s;
  }
`;

const theme = {
  space: {
    0: '0rem',
    100: '0.25rem',
    200: '0.5rem',
    300: '0.75rem',
    400: '1rem',
    500: '1.5rem',
    600: '2rem',
    700: '3rem',
    800: '4rem',
    900: '6rem',
    1000: '8rem'
  },
  default: {
    fonts: {
      sans: "'Inter', -apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, Helvetica, sans-serif;"
    }
  },
  radii: {
    0: '0px',
    100: '1px',
    200: '3px',
    300: '5px',
    400: '9px',
    full: '99999em',
    circle: '50%'
  },
  fontSizes: {
    100: '0.625rem',
    200: '0.75rem',
    300: '0.875rem',
    400: '1rem',
    500: '1.25rem',
    600: '1.5rem',
    700: '2rem'
  },
  colors: {
    gray: {
      '50': '#F9F9FC',
      '100': '#ECEFF8',
      '200': '#D8DEEB',
      '300': '#C3CDDD',
      '400': '#A1AFC3',
      '500': '#8192A8',
      '600': '#61738B',
      '700': '#43556C',
      '800': '#283B52',
      '900': '#0E233C',
      '1000': '#000'
    },
    blue: {
      focus: 'rgba(69, 143, 255, 1)'
    }
  },
  borders: {
    400: '1px solid #D8DEEB'
  }
};

export const Theme: React.FC<React.PropsWithChildren<{}>> = (props) => {
  return (
    <SweatpantsProvider theme={theme}>
      <GlobalStyle />
      {props.children}
    </SweatpantsProvider>
  );
};
