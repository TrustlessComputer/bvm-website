'use client';

import MainLayout from '@/layouts/MainLayout';
// import BVMModule from '@/modules/bvm';
import RoadmapModule from '@/modules/roadmap';

const RoadMapPage = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <RoadmapModule />
    </MainLayout>
  );
};

export default RoadMapPage;
