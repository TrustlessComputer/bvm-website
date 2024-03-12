// 'use client';

import BuildingBlockModule from '@/modules/building-blocks';
import MainLayout from '@/layouts/MainLayout';

import { CDN_URL } from '@/config';
import { APP_NAME } from '@/config/metadata';

export const metadata = {
  openGraph: {
    type: 'website',
    images: [
      {
        url: `${CDN_URL}/images/module-store.png`,
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
        url: `${CDN_URL}/images/module-store.png`,
        alt: APP_NAME,
      },
    ],
  },
};

const BuildingBlocksPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <BuildingBlockModule />
    </MainLayout>
  );
};

export default BuildingBlocksPage;
