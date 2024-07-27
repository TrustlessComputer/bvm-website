import { Metadata } from 'next';
import '@fontsource/dosis';

import MainLayout from '@/layouts/MainLayout';
import MagaModule from '@/modules/maga';

export const metadata: Metadata = {
  title: 'Bitcoin Wars',
  description:
    'Gear up for an epic adventure and strategize your way to victory in Bitcoin Wars, an incredibly fun onchain game on Bitcoin.',
  openGraph: {
    images: ['/maga/crypto-war-seo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin Wars',
    description:
      'Gear up for an epic adventure and strategize your way to victory in Bitcoin Wars, an incredibly fun onchain game on Bitcoin.',
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
