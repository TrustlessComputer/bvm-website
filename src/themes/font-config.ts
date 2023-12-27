import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

const RobotoMonoFontConfig = localFont({
  src: [
    {
      path: '../../public/fonts/RobotoMono-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/RobotoMono-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/RobotoMono-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/RobotoMono-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/RobotoMono-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});

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

const InterFontConfig = Inter({ subsets: ['latin'] });

export { InterFontConfig, RobotoMonoFontConfig, OpenSansFontConfig };
