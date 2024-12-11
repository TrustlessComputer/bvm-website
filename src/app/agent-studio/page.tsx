import MainLayout from '@/layouts/MainLayout';

import Page from '@/modules/blockchains/customize/agent-studio';
import { Metadata } from 'next';
import { APP_NAME } from '@/config/metadata';
import { CDN_URL } from '@/config';

const THUMBNAIL = `${CDN_URL}/pages/bvm-studio/bvm-studio-metadata.png`;

export const metadata: Metadata = {
  title: 'Launch your own Bitcoin L2 with drags and drops.',
  description: 'No coding expertise required — just your big idea.',
  openGraph: {
    images: [
      {
        url: THUMBNAIL,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: THUMBNAIL,
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
      // hideHeader={true}
      // isHeaderCustom
      hideFooter={true}
      bodyColor={'#f3f1e8'}
    >
      <Page />
    </MainLayout>
  );
};

export default CustomizePage;
