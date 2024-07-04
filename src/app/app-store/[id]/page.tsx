import MainLayout from '@layouts/MainLayout';
import AppDetailModule from '@/modules/app-store/detail';

const AppDetailPage = () => {
  return (
    <MainLayout
      // headerProps={{
      //   position: 'absolute',
      //   color: 'black',
      // }}
      hideFooter
    >
      <AppDetailModule />
    </MainLayout>
  );
};

export default AppDetailPage;
