import { Metadata } from 'next';

import { APP_NAME } from '@/config/metadata';
import MainLayout from '@/layouts/MainLayout';
import Page from '@/modules/blockchains/blockchain-map';

export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: `https://storage.googleapis.com/bvm-network/image/metadata%202.png`,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: `https://storage.googleapis.com/bvm-network/image/metadata%202.png`,
        alt: APP_NAME,
      },
    ],
  },
};

const CustomizePage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#F3F1E8',
      }}
      hideFooter={true}
      bodyColor={'#f3f1e8'}
    >
      <Page />
    </MainLayout>
  );
};

export default CustomizePage;