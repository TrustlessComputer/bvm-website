'use client';
import MainLayout from '@/layouts/MainLayout';
import BridgeModule from '@/modules/Bridges';

const Page = () => {
  return (
    <MainLayout
      headerProps={{
        position: 'absolute',
        color: 'black',
      }}
      bodyColor={'#fff'}
    >
      <BridgeModule />
    </MainLayout>
  );
};

export default Page;
