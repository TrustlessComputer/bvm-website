'use client';

import MainLayout from '@/layouts/MainLayout';

import Page from '@/modules/blockchains/customize/index_v3';

const CustomizePage = () => {
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

export default CustomizePage;
