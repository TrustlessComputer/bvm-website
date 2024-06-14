'use client';

import MainLayout from '@/layouts/MainLayout';
import LandingV3 from '@/modules/landingV3';

export default function Home() {
  return (
    <MainLayout
      headerProps={{
        color: 'white',
        colorLogo: 'white'
      }}
      hideFooter={true}
    >
      <LandingV3 />
    </MainLayout>
  );
}
