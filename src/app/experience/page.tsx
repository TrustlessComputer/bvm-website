'use client';

import MainLayout from '@/layouts/MainLayout';
// import LandingV3 from '@/modules/landingV3';
import LandingV5 from '@/modules/landingV5';

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
      {/* <LandingV3 /> */}
      <LandingV5 />
    </MainLayout>
  );
}
