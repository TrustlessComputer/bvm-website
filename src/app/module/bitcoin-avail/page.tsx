'use client';

import MainLayout from '@/layouts/MainLayout';
import ModuleDetail from '@/modules/ModuleDetail';
import { MODULE_DATAS } from '@/app/module/data';

const Footer = () => {
  return (
    <div>
      <p>Footer</p>
    </div>
  );
};

const ModuleDetailPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#fff',
      }}
      footerClassName="mt-0"
    >
      <ModuleDetail data={{ ...MODULE_DATAS.bvm_avail }} />
    </MainLayout>
  );
};

export default ModuleDetailPage;
