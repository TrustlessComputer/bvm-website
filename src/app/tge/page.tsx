'use client';

import React, { useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import TgeModule from '@/modules/tge';
import { useRouter } from 'next/navigation';

const TgePage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/buy-bvm');
  }, []);
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: 'white',
      }}
    >
      <TgeModule />
    </MainLayout>
  );
};

export default TgePage;
