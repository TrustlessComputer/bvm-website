import { CDN_URL } from '@/config';
import { APP_NAME } from '@/config/metadata';
import MainLayout from '@/layouts/MainLayout';
// import PricingV2 from '@/modules/PricingV2';
// import Pricing from '@/modules/PricingV3';
import Pricing from '@/modules/PricingV5';
import { Metadata } from 'next';

const THUMBNAIL = `${CDN_URL}/metadata/pricing.png`;

export const metadata: Metadata = {
  description: 'Make Bitcoin vastly more useful than just a currency.',
  openGraph: {
    images: [
      {
        url: THUMBNAIL,
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: THUMBNAIL,
        alt: APP_NAME,
      },
    ],
  },
};

export default function Builder() {
  return (
    <MainLayout
      headerProps={
        {
          // color: 'black',
          // bgColor: '#F3F1E8',
        }
      }
      hideFooter={true}
    >
      {/* {isMobile ? <PricingMobile /> : <Pricing />} */}
      <Pricing />
    </MainLayout>
  );
}
