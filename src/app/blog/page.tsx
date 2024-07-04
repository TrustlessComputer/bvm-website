'use client';

import MainLayout from '@/layouts/MainLayout';
import BlogModule from '@/modules/blog';

const BVMPage = () => {
  return (
    <MainLayout
      headerProps={{
        position: 'absolute',
        color: 'black',
      }}
      hideFooter
    >
      <BlogModule />
    </MainLayout>
  );
};

export default BVMPage;
