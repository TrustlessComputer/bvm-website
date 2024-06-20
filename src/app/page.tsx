'use client';

import MainLayout from '@/layouts/MainLayout';
import LandingV3 from '@/modules/landingV3';

export default function Home() {
  return (
    <MainLayout
      headerProps={{
        color: 'white',
        colorLogo: 'white',
        bgColor: 'transparent',
        position: 'absolute',
      }}
      hideFooter={true}
    >
      <LandingV3 />
    </MainLayout>
  );
}
