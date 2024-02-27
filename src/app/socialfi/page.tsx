import MainLayout from '@/layouts/MainLayout';
import SocialFiModule from '@/modules/socialfi';
import React from 'react';
import Loader from '@/modules/builder-landing/Loader';

const SocialFiPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
     <>
       <Loader />
       <SocialFiModule />
     </>
    </MainLayout>
  );
};

export default SocialFiPage;
