import MainLayout from '@/layouts/MainLayout';
import SocialFiModule from '@/modules/socialfi';
import React from 'react';
import Loader from '@/modules/builder-landing/Loader';

import { CDN_URL } from '@/config';
import { APP_NAME } from '@/config/metadata';

export const metadata = {
  openGraph: {
    type: 'website',
    images: [
      {
        url: `${CDN_URL}/images/socialfi.png`,
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
        url: `${CDN_URL}/images/socialfi.png`,
        alt: APP_NAME,
      },
    ],
  },
};

const SocialFiPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <>
        <Loader />
        <SocialFiModule />
      </>
    </MainLayout>
  );
};

export default SocialFiPage;
