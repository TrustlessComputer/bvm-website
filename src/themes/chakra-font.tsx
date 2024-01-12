'use client';

import { Global } from '@emotion/react';

export const ChakraFontsFace = () => {
  const isFireFox = navigator?.userAgent?.indexOf('Firefox') > -1;
  const fontVar = isFireFox ? 'system-ui,sans-serif;' : 'Helvetica Neue';
  return (
    <Global
      styles={`
      @font-face {
        font-family: ${fontVar};
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url('./fonts/HelveticaNeueThin.otf') format('otf');
      }
      @font-face {
        font-family: ${fontVar};
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/HelveticaNeueLight.otf') format('otf');
      }
      @font-face {
        font-family: ${fontVar};
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('./fonts/HelveticaNeueMedium.otf') format('otf');
      }
      @font-face {
        font-family: ${fontVar};
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('./fonts/HelveticaNeueBold.otf') format('otf');
      }
      @font-face {
        font-family: ${fontVar};
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/HelveticaNeueHeavy.otf') format('otf');
      }
      @font-face {
        font-family: ${fontVar};
        font-style: normal;
        font-weight: 800;
        font-display: swap;
        src: url('./fonts/HelveticaNeueBlack.otf') format('otf');
      }
      `}
    />
  );
};

export default ChakraFontsFace;
