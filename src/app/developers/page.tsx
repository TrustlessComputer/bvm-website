'use client';

import MainLayout from '@/layouts/MainLayout';
import DevelopersModule from '@/modules/developers';

const DevelopersPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <DevelopersModule />
    </MainLayout>
  );
};

export default DevelopersPage;
