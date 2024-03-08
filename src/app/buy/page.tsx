'use client';

import MainLayout from '@/layouts/MainLayout';
// import BVMModule from '@/modules/bvm';
import BVMModule from '@/modules/bvm_v2';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const BVMPage = () => {

  const router = useRouter();
  useEffect(() => {
    router.push('/buy-bvm');
  }, []);
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
