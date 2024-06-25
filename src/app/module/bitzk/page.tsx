'use client';

import MainLayout from '@/layouts/MainLayout';
import ModuleDetail from '@/modules/ModuleDetail';
import { MODULE_DATAS } from '@/app/module/data';

const ModuleDetailPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#fff',
      }}
      hideFooter
    >
      <ModuleDetail data={MODULE_DATAS.bitzk} />
    </MainLayout>
  );
};

export default ModuleDetailPage;
