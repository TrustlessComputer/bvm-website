'use client';

import MainLayout from '@layouts/MainLayout';
import Hero from '@/modules/aiLandingModule/section/Hero';

const ShardModule = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'white',
      }}
    >
      <Hero />
    </MainLayout>
  )
};

export default ShardModule;
