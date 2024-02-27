import MainLayout from '@/layouts/MainLayout';
import SocialFiModule from '@/modules/socialfi';
import React from 'react';

const SocialFiPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <SocialFiModule />
    </MainLayout>
  );
};

export default SocialFiPage;
