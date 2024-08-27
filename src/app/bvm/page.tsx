// 'use client';

import { CDN_URL } from '@/config';
import { APP_NAME } from '@/config/metadata';
import MainLayout from '@/layouts/MainLayout';
import BVMModule from '@/modules/bvm_v4';
import { Metadata } from 'next';

const THUMBNAIL = `${CDN_URL}/metadata/bvm-metadata.png`;

export const metadata: Metadata = {
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

const BVMPage = () => {
  return (
    <MainLayout
      headerProps={{
        position: 'absolute',
        color: 'black',
      }}
      hideFooter
    >
      <BVMModule />
    </MainLayout>
  );
};

export default BVMPage;
