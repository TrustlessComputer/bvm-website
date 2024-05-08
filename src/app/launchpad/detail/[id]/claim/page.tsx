import AssetsProvider from '@/providers/AssetsProvider';
import LaunchpadProvider from '@/providers/LaunchpadProvider';
import MainLayout from '@/templates/Main';
import React from 'react';
import LaunchpadClaimModule from "@/modules/Launchpad/Launchpad.Claim";

const LaunchpadClaim = () => {
  return (
    <AssetsProvider>
      <LaunchpadProvider>
        <MainLayout noFooter={true} theme={'light'}>
          <LaunchpadClaimModule />
        </MainLayout>
      </LaunchpadProvider>
    </AssetsProvider>
  );
};

export default LaunchpadClaim;
