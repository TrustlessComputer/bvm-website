'use client';

import MainLayout from '@/layouts/MainLayout';
import LandingV3 from '@/modules/landingV3';

export default function Home() {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <LandingV3 />
    </MainLayout>
  );
}
