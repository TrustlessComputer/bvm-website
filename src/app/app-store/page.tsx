'use client';

import MainLayout from '@/layouts/MainLayout';
import AppStoreModule from '@/modules/app-store';

const AppStorePage = () => {
  return (
    <MainLayout
      // headerProps={{
      //   position: 'absolute',
      //   color: 'black',
      // }}
      hideFooter
    >
      <AppStoreModule />
    </MainLayout>
  );
};

export default AppStorePage;
