'use client';

import { useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import WhitelistModule from '@/modules/Whitelist';

const Whitelist = () => {
  useEffect(() => {
    console.log('TestPage render ready!');
  }, []);

  return (
    <MainLayout>
      <WhitelistModule/>
    </MainLayout>
  );
};

export default Whitelist;
