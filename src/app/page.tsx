'use client';

import MainLayout from '@/layouts/MainLayout';
// import LandingV3 from '@/modules/landingV3';
import LandingV4Module from '@/modules/landingV4';

export default function Home() {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        colorLogo: 'black',
        // bgColor: 'transparent',
        // position: 'absolute',
        // showBanner: true,
      }}
      footerClassName={'mt-0'}
    >
      {/* <LandingV3 /> */}
      <LandingV4Module />
    </MainLayout>
  );
}
