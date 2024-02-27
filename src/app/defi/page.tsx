import MainLayout from '@/layouts/MainLayout';
import DeFiModule from '@/modules/defi';
import React from 'react';
import Loader from '@/modules/builder-landing/Loader';

const DeFiPage = () => {
  return (
    <MainLayout
      headerProps={{
      color: 'black',
    }}
    >
      <>
        <Loader />
        <DeFiModule />
      </>
    </MainLayout>
  );
};

export default DeFiPage;
