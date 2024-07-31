'use client';

import MainLayout from '@/layouts/MainLayout';

import Page from '@/modules/blockchains/customize/index_v4';

const CustomizePage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#F3F1E8',
      }}
      hideHeader={true}
      isHeaderCustom
      hideFooter={true}
      bodyColor={'#f3f1e8'}
    >
      <Page />
    </MainLayout>
  );
};

export default CustomizePage;
