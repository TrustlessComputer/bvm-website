'use client';

import MainLayout from '@/layouts/MainLayout';
import LandingV2 from '@/modules/landingV2';

export default function Home() {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <LandingV2 />
    </MainLayout>
  );
}
