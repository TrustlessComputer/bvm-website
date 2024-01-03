'use client';

import MainLayout from '@/layouts/MainLayout';
import WhitePapersModule from '@/modules/whitepapers';

const WhitePapersPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <WhitePapersModule />
    </MainLayout>
  );
};

export default WhitePapersPage;
