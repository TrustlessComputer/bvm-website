'use client';

import MainLayout from '@/layouts/MainLayout';
// import PricingV2 from '@/modules/PricingV2';
import Pricing from '@/modules/PricingV3';

export default function Builder() {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#F3F1E8',
      }}
      hideFooter={true}
    >
      <Pricing />
    </MainLayout>
  );
}
