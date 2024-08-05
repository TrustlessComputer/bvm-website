import MainLayout from '@/layouts/MainLayout';
import L2RollupModule from '@/modules/l2-rollup';
import React from 'react';
import { CDN_URL } from '@/config';
import { APP_NAME } from '@/config/metadata';

const TITLE = 'Heartbeat | Welcome to the future of Bitcoin.'
const DESCRIPTION = 'Provide transparent and verifiable insights into Bitcoin rollups.'

export const metadata = {
  applicationName: TITLE,
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    images: [
      {
        url: '/heartbeat/heart-beat-seo.png',
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: '/heartbeat/heart-beat-seo.png',
  },
};

export default function Page() {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#F3F1E8',
      }}
      hideFooter={false}
      bodyColor={'#f3f1e8'}
    >
      <L2RollupModule />
    </MainLayout>
  );
}
