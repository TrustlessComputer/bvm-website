import MainLayout from '@layouts/MainLayout';
import Loader from '@/modules/builder-landing/Loader';
import DeFiModule from '@/modules/defi';
import React from 'react';


const Ecosystems = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
      hideFooter
    >
      <>
        <Loader />
        <DeFiModule />
      </>
    </MainLayout>
  );
}

export default Ecosystems
