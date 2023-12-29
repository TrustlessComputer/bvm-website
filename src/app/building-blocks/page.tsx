'use client';

import BuildingBlockModule from '@/modules/building-blocks';
import MainLayout from '@/layouts/MainLayout';

const BuildingBlocksPage = () => {
  return (
    <MainLayout
      headerProps={{
        primaryColor: 'black',
      }}
    >
      <BuildingBlockModule />
    </MainLayout>
  );
};

export default BuildingBlocksPage;
