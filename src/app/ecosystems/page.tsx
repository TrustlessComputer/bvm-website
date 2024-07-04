import MainLayout from '@layouts/MainLayout';
import Loader from '@/modules/builder-landing/Loader';
import DeFiModule from '@/modules/defi';
import React from 'react';
import EcosystemsModule from '@/modules/ecosystemsModule';


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
        <EcosystemsModule />
      </>
    </MainLayout>
  );
}

export default Ecosystems
