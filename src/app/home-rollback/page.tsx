'use client';

import MainLayout from '@/layouts/MainLayout';
import Landing from '@/modules/landing';
// import LandingV3 from '@/modules/landingV3';

export default function Home() {
  return (
    <MainLayout
      headerProps={{
        // color: 'white',
        // colorLogo: 'white',
        // bgColor: '#1C1C1C',
        theme: 'white',
      }}
      hideFooter
    >
      <Landing />
    </MainLayout>
  );
}
