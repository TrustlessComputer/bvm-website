// 'use client';

import MainLayout from '@/layouts/MainLayout';
import RoadmapModule from '@/modules/roadmap';

import { CDN_URL } from '@/config';
import { APP_NAME } from '@/config/metadata';

export const metadata = {
  openGraph: {
    type: 'website',
    images: [
      {
        url: `${CDN_URL}/images/roadmap.png`,
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
        url: `${CDN_URL}/images/roadmap.png`,
        alt: APP_NAME,
      },
    ],
  },
};

const RoadMapPage = () => {
  return (
    <MainLayout
      hideFooter={true}
      headerProps={{
        color: 'black',
      }}
    >
      <RoadmapModule />
    </MainLayout>
  );
};

export default RoadMapPage;
