import Page from '@/modules/blockchains/detail';
import MainLayout from '@/layouts/MainLayout';

const PageDetail = () => {
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

export default PageDetail;
