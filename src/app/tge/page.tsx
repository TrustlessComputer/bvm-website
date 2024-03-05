import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import TgeModule from '@/modules/tge';

const TgePage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: 'white',
      }}
    >
      <TgeModule />
    </MainLayout>
  );
};

export default TgePage;
