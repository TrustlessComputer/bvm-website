import { Metadata } from 'next';
import '@fontsource/dosis';

import MainLayout from '@/layouts/MainLayout';
import MagaModule from '@/modules/maga';

const APP_TITLE =
  'Bitcoin Wars | The first fully on-chain game built on a ZK Rollup on the Bitcoin network.';
const APP_DESCRIPTION =
  'Gear up for an epic adventure and strategize your way to victory in Bitcoin Wars, an incredibly fun onchain game on Bitcoin.';

export const metadata: Metadata = {
  title: {
    absolute: APP_TITLE,
  },
  description: APP_DESCRIPTION,
  openGraph: {
    title: {
      absolute: APP_TITLE,
    },
    images: ['/maga/crypto-war-seo.png'],
  },
  appleWebApp: {
    title: APP_TITLE,
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      absolute: APP_TITLE,
    },
    description: APP_DESCRIPTION,
    images: '/maga/crypto-war-seo.png',
  },
};

export default function Page() {
  return (
    <MainLayout
      headerProps={{
        color: 'white',
        colorLogo: 'white',
        bgColor: 'black',
        position: 'absolute',
      }}
      hideFooter={true}
    >
      <MagaModule />
    </MainLayout>
  );
}
