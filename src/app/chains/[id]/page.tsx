'use client';

// import UpdateChain from '@/modules/blockchains/Buy/UpdateChain';
import ChainDetailPage from '@/modules/blockchains/detail_v3';
import MainLayout from '@/layouts/MainLayout';

const PageDetail = () => {
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
      <ChainDetailPage />
    </MainLayout>
  );
};

export default PageDetail;
