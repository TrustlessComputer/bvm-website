import { CDN_URL } from '@/config';
import { APP_NAME } from '@/config/metadata';
import MainLayout from '@/layouts/MainLayout';
import OpenSourceModule from '@/modules/openSource';
import ResearchModule from '@/modules/research';
import { Metadata } from 'next';
import React from 'react';

const THUMBNAIL = `${CDN_URL}/metadata/bvm-research.png`;

export const metadata: Metadata = {
  description: 'Make Bitcoin vastly more useful than just a currency.',
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

export default function Page() {
  return (
    <MainLayout
      headerProps={
        {
          // color: 'white',
          // colorLogo: 'white',
          // bgColor: 'black',
          // position: 'absolute',
          // theme: 'black',
        }
      }
      hideFooter={true}
    >
      <OpenSourceModule />
    </MainLayout>
  );
}
