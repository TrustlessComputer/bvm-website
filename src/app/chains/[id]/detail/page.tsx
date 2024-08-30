'use client';

import Page from '@/modules/blockchains/detail_v2'; //Detail Blockchain Page
import MainLayout from '@/layouts/MainLayout';

const PageDetail = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#F3F1E8',
      }}
      // hideHeader={true}
      // isHeaderCustom
      hideFooter={true}
      bodyColor={'#f3f1e8'}
    >
      <Page />
    </MainLayout>
  );
};

export default PageDetail;
