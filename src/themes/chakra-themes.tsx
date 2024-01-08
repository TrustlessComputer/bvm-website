'use client';

import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

import { Global } from '@emotion/react';

export const ChakraFontsFace = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Helvetica Neue';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url('./fonts/HelveticaNeueThin.otf') format('otf');
      }
      @font-face {
        font-family: 'Helvetica Neue';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/HelveticaNeueLight.otf') format('otf');
      }
      @font-face {
        font-family: 'Helvetica Neue';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('./fonts/HelveticaNeueMedium.otf') format('otf');
      }
      @font-face {
        font-family: 'Helvetica Neue';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('./fonts/HelveticaNeueBold.otf') format('otf');
      }
      @font-face {
        font-family: 'Helvetica Neue';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/HelveticaNeueHeavy.otf') format('otf');
      }
      @font-face {
        font-family: 'Helvetica Neue';
        font-style: normal;
        font-weight: 800;
        font-display: swap;
        src: url('./fonts/HelveticaNeueBlack.otf') format('otf');
      }
      `}
  />
);

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const breakpoints = {
  base: '0px',
  sm: '480px',
  md: '768px',
  lg: '992px',
  xl: '1280px',
  '2xl': '1536px',
  max: '1600px',
};

const chakraThemes = extendTheme({
  config,
  breakpoints,
  styles: {
    global: {
      body: {
        minHeight: '100dvh',
        fontFamily: `Helvetica Neue`,
        color: 'white',
        lineHeight: 'base',
      },
    },
  },
});

export default chakraThemes;
