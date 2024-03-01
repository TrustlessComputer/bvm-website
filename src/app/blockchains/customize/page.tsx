'use client';

import { DOMAIN_URL, isDevelop, isLocal } from '@/config';
import MainLayout from '@/layouts/MainLayout';
import dynamic from 'next/dynamic';
import Banner from '@/modules/landing/Componets/Hero/Banner';
import React from 'react';
import s from './sytles.module.scss'

const pathUrl = '/bvm-website-sats-iframe/buy';

const iframeL2ServicesDomain = isLocal ? 'http://localhost:6009' : DOMAIN_URL;

const IframeTCDynamic = dynamic(
  () => import('@/modules/iframe-tc').then((m) => m.default),
  {
    ssr: false,
  },
);

const TCPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#F3F1E8',
      }}
    >
      <div className={s.banner}>
        <Banner disabledAnimation={true} />
      </div>
      <IframeTCDynamic iframeURL={`${iframeL2ServicesDomain}${pathUrl}`} />
    </MainLayout>
  );
};

export default TCPage;
