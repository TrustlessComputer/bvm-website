import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

const BandeinsSans = localFont({
  src: [
    {
      path: '../../public/fonts/BandeinsSans-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/BandeinsSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/BandeinsSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/BandeinsSans-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/BandeinsSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

const InterFontConfig = Inter({ subsets: ['latin'] });

// const somethingFont = localFont({
//   src: [
//     {
//       path: "../../public/fonts/BandeinsSans-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//   ],
// });

export { BandeinsSans, InterFontConfig };
