import { CDN_URL } from '@/config';
import MainLayout from '@/layouts/MainLayout';
import L2RollupModule from '@/modules/l2-rollup';
import { Metadata } from 'next';
import React from 'react';

const TITLE = 'Bitcoin Heartbeat | Welcome to the future of Bitcoin.';
const DESCRIPTION =
  'Provide transparent and verifiable insights into Bitcoin rollups.';

const THUMBNAIL = `${CDN_URL}/pages/bvm-studio/bvm-heartbeat-metadata.png`;

export const metadata: Metadata = {
  applicationName: TITLE,
  title: {
    default: TITLE,
    template: '',
  },
  description: DESCRIPTION,
  icons: '/icons/heartbeat.svg',
  openGraph: {
    type: 'website',
    title: {
      default: TITLE,
      template: '',
    },
    images: [
      {
        url: THUMBNAIL,
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: TITLE,
      template: '',
    },
    description: DESCRIPTION,
    images: THUMBNAIL,
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