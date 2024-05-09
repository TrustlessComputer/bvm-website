'use client';

import React from 'react';
import AssetsProvider from '@/Providers/AssetsProvider';
import Home from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/Home/Home';
import useFetchPaymentEAI from '@/modules/Launchpad/Launchpad.Detail/eternalAI/EAIPayment/hooks/useFetchPaymentEAI';

const LaunchpadEAIHome = React.memo(() => {
  useFetchPaymentEAI();
  return (
    <AssetsProvider>
      <Home />
    </AssetsProvider>
  );
});

LaunchpadEAIHome.displayName = 'LaunchpadEAIHome';

export default LaunchpadEAIHome;
