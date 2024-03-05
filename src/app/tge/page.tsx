import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import TgeModule from '@/modules/tge';
import Loader from '@/modules/builder-landing/Loader';

const TgePage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: 'white',
      }}
    >
      <>
        <Loader />
        <TgeModule />
      </>
    </MainLayout>
  );
};

export default TgePage;
