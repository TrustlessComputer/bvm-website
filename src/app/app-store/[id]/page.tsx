import MainLayout from '@layouts/MainLayout';
import AppDetailModule from '@/modules/app-store/detail';
import AppStoreProvider from '@/modules/app-store/providers';

const AppDetailPage = () => {
  return (
    <AppStoreProvider>
      <MainLayout
        // headerProps={{
        //   position: 'absolute',
        //   color: 'black',
        // }}
        hideFooter
      >
        <AppDetailModule />
      </MainLayout>
    </AppStoreProvider>
  );
};

export default AppDetailPage;
