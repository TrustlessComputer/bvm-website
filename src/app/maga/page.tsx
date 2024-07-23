import { Metadata } from 'next';
import '@fontsource/advent-pro';

import MainLayout from '@/layouts/MainLayout';
import MagaModule from '@/modules/maga';

export const metadata: Metadata = {
  title: 'BITCOIN WAR',
  description:
    'The first fully on-chain game built on a ZK Rollup on the Bitcoin network. Powered by BVM.',
  openGraph: {
    images: ['/maga/crypto-war.svg'],
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
