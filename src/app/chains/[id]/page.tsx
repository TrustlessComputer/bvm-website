// import Page from '@/modules/blockchains/detail';
import Page from '@/modules/blockchains/detail_v2';
import MainLayout from '@/layouts/MainLayout';

const PageDetail = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#fff',
      }}
      hideFooter
    >
      <Page />
    </MainLayout>
  );
};

export default PageDetail;
