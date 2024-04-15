'use client';

import { Global } from '@emotion/react';

export const ChakraFontsFace = () => {
  // const isFireFox = navigator?.userAgent?.indexOf('Firefox') > -1;
  // const fontVar = isFireFox ? 'system-ui,sans-serif;' : 'Helvetica Neue';
  return (
    <Global
      styles={`
      @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;700&display=swap');
       @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
      @font-face {
        font-family: 'Helvetica Neue';
        src: local('Helvetica Neue Thin Italic'), local('HelveticaNeue-ThinItalic'),
        url('/webfont/HelveticaNeue-ThinItalic.woff2') format('woff2'),
        url('/webfont/HelveticaNeue-ThinItalic.woff') format('woff');
        font-weight: 100;
        font-style: italic;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Helvetica Neue';
        src: local('Helvetica Neue Ultra Light Italic'), local('HelveticaNeue-UltraLightItalic'),
        url('/webfont/HelveticaNeue-UltraLightItalic.woff2') format('woff2'),
        url('/webfont/HelveticaNeue-UltraLightItalic.woff') format('woff');
        font-weight: 200;
        font-style: italic;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Helvetica Neue';
        src: local('Helvetica Neue Ultra Light'), local('HelveticaNeue-UltraLight'),
        url('/webfont/HelveticaNeue-UltraLight.woff2') format('woff2'),
        url('/webfont/HelveticaNeue-UltraLight.woff') format('woff');
        font-weight: 200;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Helvetica Neue';
        src: local('Helvetica Neue Medium Italic'), local('HelveticaNeue-MediumItalic'),
        url('/webfont/HelveticaNeue-MediumItalic.woff2') format('woff2'),
        url('/webfont/HelveticaNeue-MediumItalic.woff') format('woff');
        font-weight: 500;
        font-style: italic;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Helvetica Neue';
        src: local('Helvetica Neue Thin'), local('HelveticaNeue-Thin'),
        url('/webfont/HelveticaNeue-Thin.woff2') format('woff2'),
        url('/webfont/HelveticaNeue-Thin.woff') format('woff');
        font-weight: 100;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Helvetica Neue';
        src: local('Helvetica Neue Light Italic'), local('HelveticaNeue-LightItalic'),
        url('/webfont/HelveticaNeue-LightItalic.woff2') format('woff2'),
        url('/webfont/HelveticaNeue-LightItalic.woff') format('woff');
        font-weight: 300;
        font-style: italic;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Helvetica Neue';
        src: local('Helvetica Neue Light'), local('HelveticaNeue-Light'),
        url('/webfont/HelveticaNeue-Light.woff2') format('woff2'),
        url('/webfont/HelveticaNeue-Light.woff') format('woff');
        font-weight: 300;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Helvetica Neue';
        src: local('Helvetica Neue Italic'), local('HelveticaNeue-Italic'),
        url('/webfont/HelveticaNeue-Italic.woff2') format('woff2'),
        url('/webfont/HelveticaNeue-Italic.woff') format('woff');
        font-weight: normal;
        font-style: italic;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Helvetica Neue';
        src: local('Helvetica Neue Medium'), local('HelveticaNeue-Medium'),
        url('/webfont/HelveticaNeue-Medium.woff2') format('woff2'),
        url('/webfont/HelveticaNeue-Medium.woff') format('woff');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Helvetica Neue';
        src: local('Helvetica Neue Roman'), local('HelveticaNeue-Roman'),
        url('/webfont/HelveticaNeue-Roman.woff2') format('woff2'),
        url('/webfont/HelveticaNeue-Roman.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Helvetica Neue';
        src: local('Helvetica Neue Heavy Italic'), local('HelveticaNeue-HeavyItalic'),
        url('/webfont/HelveticaNeue-HeavyItalic.woff2') format('woff2'),
        url('/webfont/HelveticaNeue-HeavyItalic.woff') format('woff');
        font-weight: 900;
        font-style: italic;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Helvetica Neue';
        src: local('Helvetica Neue Heavy'), local('HelveticaNeue-Heavy'),
        url('/webfont/HelveticaNeue-Heavy.woff2') format('woff2'),
        url('/webfont/HelveticaNeue-Heavy.woff') format('woff');
        font-weight: 900;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Helvetica Neue';
        src: local('Helvetica Neue Bold Italic'), local('HelveticaNeue-BoldItalic'),
        url('/webfont/HelveticaNeue-BoldItalic.woff2') format('woff2'),
        url('/webfont/HelveticaNeue-BoldItalic.woff') format('woff');
        font-weight: bold;
        font-style: italic;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Helvetica Neue';
        src: local('Helvetica Neue Bold'), local('HelveticaNeue-Bold'),
        url('/webfont/HelveticaNeue-Bold.woff2') format('woff2'),
        url('/webfont/HelveticaNeue-Bold.woff') format('woff');
        font-weight: bold;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Helvetica Neue';
        src: local('Helvetica Neue Black'), local('HelveticaNeue-Black'),
        url('/webfont/HelveticaNeue-Black.woff2') format('woff2'),
        url('/webfont/HelveticaNeue-Black.woff') format('woff');
        font-weight: 900;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Helvetica Neue';
        src: local('Helvetica Neue Black Italic'), local('HelveticaNeue-BlackItalic'),
        url('/webfont/HelveticaNeue-BlackItalic.woff2') format('woff2'),
        url('/webfont/HelveticaNeue-BlackItalic.woff') format('woff');
        font-weight: 900;
        font-style: italic;
        font-display: swap;
      }

      @font-face {
        font-family: 'Urbanist';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url('./fonts/Urbanist-Thin.ttf') format('ttf');
      }
      @font-face {
        font-family: 'Urbanist';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/Urbanist-Light.ttf') format('ttf');
      }
      @font-face {
        font-family: 'Urbanist';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('./fonts/Urbanist-Medium.ttf') format('ttf');
      }
      @font-face {
        font-family: 'Urbanist';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('./fonts/Urbanist-SemoBold.ttf') format('ttf');
      }
      @font-face {
        font-family: 'Urbanist';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/Urbanist-ExtraBold.ttf') format('ttf');
      }
      @font-face {
        font-family: 'Urbanist';
        font-style: normal;
        font-weight: 800;
        font-display: swap;
        src: url('./fonts/Urbanist-ExtraBold.ttf') format('ttf');
      }
      @font-face {
        font-family: 'Space Mono';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/SpaceMono-Regular.ttf') format('ttf');
      }
      @font-face {
        font-family: 'Space Mono';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('./fonts/SpaceMono-Regular.ttf') format('ttf');
      }
      @font-face {
        font-family: 'Space Mono';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('./fonts/SpaceMono-Bold.ttf') format('ttf');
      }
      `}
    />
  );
};

export default ChakraFontsFace;
