'use client';

import MainLayout from '@/layouts/MainLayout';
// // import PricingV2 from '@/modules/PricingV2';
// import Pricing from '@/modules/PricingV3';
import PricingMobile from '@/modules/PricingV4/MobileMode';
import PriceV2Module from '@/modules/PricingV4';
import { isMobile } from 'react-device-detect';

export default function Builder() {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#F3F1E8',
      }}
      hideFooter={true}
    >
      {isMobile ? <PricingMobile /> : <PriceV2Module />}
    </MainLayout>
  );
}
