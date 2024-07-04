import MainLayout from '@layouts/MainLayout';
import Loader from '@/modules/builder-landing/Loader';
import DeFiModule from '@/modules/defi';
import React from 'react';
import AppChainsModule from '@/modules/appchainsModule';


const AppChains = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
      hideFooter
    >
      <>
        <Loader />
        <AppChainsModule />
      </>
    </MainLayout>
  );
}

export default AppChains
