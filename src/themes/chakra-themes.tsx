'use client';

import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const chakraThemes = extendTheme({
  config,
  styles: {
    global: {
      body: {
        minHeight: '100dvh',
      },
    },
  },
  fonts: {
    color: 'white',
  },
});

export default chakraThemes;
