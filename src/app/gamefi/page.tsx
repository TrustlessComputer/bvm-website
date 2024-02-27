import MainLayout from '@/layouts/MainLayout';
import GameFiModule from '@/modules/gamefi';
import React from 'react';
import Loader from '@/modules/builder-landing/Loader';

const GameFiPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <>
        <Loader />
        <GameFiModule />
      </>
    </MainLayout>
  );
};

export default GameFiPage;
