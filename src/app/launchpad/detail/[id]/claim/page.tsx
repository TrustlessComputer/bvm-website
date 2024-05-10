import AssetsProvider from '@/Providers/AssetsProvider';
import LaunchpadProvider from '@/Providers/LaunchpadProvider';
import React from 'react';
import LaunchpadClaimModule from '@/modules/Launchpad/Launchpad.Claim';
import MainLayout from '@/layouts/MainLayout';

const LaunchpadClaim = () => {
  return (
    <AssetsProvider>
      <LaunchpadProvider>
        <MainLayout>
          <LaunchpadClaimModule />
        </MainLayout>
      </LaunchpadProvider>
    </AssetsProvider>
  );
};

export default LaunchpadClaim;
