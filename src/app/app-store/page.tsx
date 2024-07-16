'use client';

import MainLayout from '@/layouts/MainLayout';
import AppStoreModule from '@/modules/app-store/v2';
import AppStoreProvider from '@/modules/app-store/providers';

const AppStorePage = () => {
  return (
    <AppStoreProvider>
      <MainLayout
        // headerProps={{
        //   position: 'absolute',
        //   color: 'black',
        // }}
        hideFooter
      >
        <AppStoreModule />
      </MainLayout>
    </AppStoreProvider>
  );
};

export default AppStorePage;
