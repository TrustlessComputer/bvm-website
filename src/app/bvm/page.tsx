'use client';

import MainLayout from '@/layouts/MainLayout';
import BVMModule from '@/modules/bvm_v3';

const BVMPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
      hideFooter
    >
      <BVMModule />
    </MainLayout>
  );
};

export default BVMPage;
