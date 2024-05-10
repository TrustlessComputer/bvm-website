'use client';

import LaunchpadProvider from '@/Providers/LaunchpadProvider';
import AssetsProvider from '@/Providers/AssetsProvider';
import dynamic from 'next/dynamic';

const LaunchpadDetailModule = dynamic(
  () => import('@/modules/Launchpad/Launchpad.Detail/detail').then((w) => w),
  {
    ssr: false,
  },
);

const LaunchpadDetailHome = () => {
  return (
    <AssetsProvider>
      <LaunchpadProvider>
        <LaunchpadDetailModule />
      </LaunchpadProvider>
    </AssetsProvider>
  );
};

export default LaunchpadDetailHome;
