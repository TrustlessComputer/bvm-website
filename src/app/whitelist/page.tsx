'use client';

import MainLayout from '@/layouts/MainLayout';
import WhitelistModule from '@/modules/Whitelist';

const Whitelist = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#F3F1E8',
      }}
    >
      <WhitelistModule/>
    </MainLayout>
  );
};

export default Whitelist;
