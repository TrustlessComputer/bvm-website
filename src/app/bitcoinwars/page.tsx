import { Metadata } from 'next';
import '@fontsource/advent-pro';

import MainLayout from '@/layouts/MainLayout';
import MagaModule from '@/modules/maga';

export const metadata: Metadata = {
  title: 'Bitcoin Wars',
  description:
    'Prepare your strategy and engage in the battle that will shape the future of Bitcoin. Starting at the Bitcoin 2024 Conference in Nashville.',
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
