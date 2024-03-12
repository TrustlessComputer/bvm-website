import MainLayout from '@/layouts/MainLayout';
import BitcoinL2S from '@/modules/BitcoinL2S';

import { CDN_URL } from '@/config';
import { APP_NAME } from '@/config/metadata';

export const metadata = {
  openGraph: {
    type: 'website',
    images: [
      {
        url: `${CDN_URL}/images/bitcoin-l2.png`,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: `${CDN_URL}/images/bitcoin-l2.png`,
        alt: APP_NAME,
      },
    ],
  },
};

const BitcoinL2SPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: 'white',
      }}
    >
      <BitcoinL2S />
    </MainLayout>
  );
};

export default BitcoinL2SPage;
