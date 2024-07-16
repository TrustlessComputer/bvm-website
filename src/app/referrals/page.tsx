'use client';

import MainLayout from '@layouts/MainLayout';
import React from 'react';
import { isDesktop } from 'react-device-detect';
import Referrals from '@/modules/Referrals';

const PageReferrals = () => {
  return (
    <MainLayout hideFooter={isDesktop}>
      <Referrals />
    </MainLayout>
  );
};

export default PageReferrals;
