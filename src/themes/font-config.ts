import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

const OpenSansFontConfig = localFont({
  src: [
    {
      path: '../../public/fonts/OpenSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/OpenSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/OpenSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/OpenSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/OpenSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/OpenSans-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
});

const HelveticaNeueFontConfig = localFont({
  src: [
    {
      path: '../../public/fonts/HelveticaNeueThin.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/HelveticaNeueLight.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/HelveticaNeueMedium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/HelveticaNeueBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/HelveticaNeueHeavy.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/HelveticaNeueBlack.otf',
      weight: '800',
      style: 'normal',
    },
  ],
});

const a = 'a';

const InterFontConfig = Inter({ subsets: ['latin'] });

export { InterFontConfig, OpenSansFontConfig, HelveticaNeueFontConfig };
