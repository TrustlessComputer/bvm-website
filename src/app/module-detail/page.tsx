'use client';

import MainLayout from '@/layouts/MainLayout';
import ModuleDetail from '@/modules/ModuleDetail';

const ModuleDetailPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#fff',
      }}
      hideFooter
    >
      <ModuleDetail />
    </MainLayout>
  );
};

export default ModuleDetailPage;
