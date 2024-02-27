import MainLayout from '@/layouts/MainLayout';
import GameFiModule from '@/modules/gamefi';
import React from 'react';

const GameFiPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <GameFiModule />
    </MainLayout>
  );
};

export default GameFiPage;
