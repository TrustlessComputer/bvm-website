'use client';

import MainLayout from '@/layouts/MainLayout';
import Page from '@/modules/blockchains';

const BlockChainPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#F3F1E8',
      }}
    >
      <Page />
    </MainLayout>
  );
};

export default BlockChainPage;
