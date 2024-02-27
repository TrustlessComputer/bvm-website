import MainLayout from '@/layouts/MainLayout';
import DeFiModule from '@/modules/defi';
import React from 'react';

const DeFiPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <DeFiModule />
    </MainLayout>
  );
};

export default DeFiPage;
