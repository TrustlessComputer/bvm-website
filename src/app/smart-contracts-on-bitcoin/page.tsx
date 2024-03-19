// 'use client';

import { CDN_URL } from '@/config';
import { APP_NAME } from '@/config/metadata';
import MainLayout from '@/layouts/MainLayout';
import BvmSctLanding from '@/modules/bvm-sct-landing';

export const metadata = {
  openGraph: {
    type: 'website',
    images: [
      {
        url: `${CDN_URL}/images/smart-contract-on-bitcoin.png`,
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
        url: `${CDN_URL}/images/smart-contract-on-bitcoin.png`,
        alt: APP_NAME,
      },
    ],
  },
};

export default function Builder() {
  return (
    <>
      <MainLayout>
        <BvmSctLanding />
      </MainLayout>
    </>
  );
}
