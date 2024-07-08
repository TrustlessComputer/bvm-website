import MainLayout from '@/layouts/MainLayout';
import DeFiModule from '@/modules/defi';
import React from 'react';
import Loader from '@/modules/builder-landing/Loader';

import { CDN_URL } from '@/config';
import { APP_NAME } from '@/config/metadata';
import {RESOLUTION_DATAS} from "@constants/solution-data";
import ResolutionDetail from "@/modules/ResolutionDetail";

export const metadata = {
  openGraph: {
    type: 'website',
    images: [
      {
        url: `${CDN_URL}/images/defi.png`,
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
        url: `${CDN_URL}/images/defi.png`,
        alt: APP_NAME,
      },
    ],
  },
};

const DeFiPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
      hideFooter
    >
      <>
        <Loader />
        <ResolutionDetail data={RESOLUTION_DATAS.defi} />
      </>
    </MainLayout>
  );
};

export default DeFiPage;
