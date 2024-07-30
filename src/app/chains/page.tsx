'use client';

import MainLayout from '@/layouts/MainLayout';
// import Page from '@/modules/blockchains';
import Page from '@/modules/blockchains/Dashboard.page_v2';

const BlockChainPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#F3F1E8',
      }}
      hideFooter={true}
    >
      <Page />
    </MainLayout>
  );
};

export default BlockChainPage;
