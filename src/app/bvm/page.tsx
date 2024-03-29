'use client';

import MainLayout from '@/layouts/MainLayout';
import BVMModule from '@/modules/bvm_v2';

const BVMPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <BVMModule />
    </MainLayout>
  );
};

export default BVMPage;
