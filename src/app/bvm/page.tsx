'use client';

import MainLayout from '@/layouts/MainLayout';
import BVMModule from '@/modules/bvm_v4';

const BVMPage = () => {
  return (
    <MainLayout
      headerProps={{
        position: 'absolute',
        color: 'black',
      }}
      hideFooter
    >
      <BVMModule />
    </MainLayout>
  );
};

export default BVMPage;
