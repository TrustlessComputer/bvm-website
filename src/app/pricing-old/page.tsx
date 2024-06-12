'use client';

import MainLayout from '@/layouts/MainLayout';
import PriceModule from '@/modules/price';

export default function Builder() {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <PriceModule />
    </MainLayout>
  );
}
