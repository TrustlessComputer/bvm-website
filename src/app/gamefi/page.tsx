import MainLayout from '@/layouts/MainLayout';
import GameFiModule from '@/modules/gamefi';
import React from 'react';
import Loader from '@/modules/builder-landing/Loader';

import { CDN_URL } from '@/config';
import { APP_NAME } from '@/config/metadata';
import ResolutionDetail from "@/modules/ResolutionDetail";
import {RESOLUTION_DATAS} from "@constants/solution-data";

export const metadata = {
  openGraph: {
    type: 'website',
    images: [
      {
        url: `${CDN_URL}/images/gamefi.png`,
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
        url: `${CDN_URL}/images/gamefi.png`,
        alt: APP_NAME,
      },
    ],
  },
};

const GameFiPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <>
        <Loader />
        <ResolutionDetail data={RESOLUTION_DATAS.gamefi} />
      </>
    </MainLayout>
  );
};

export default GameFiPage;
