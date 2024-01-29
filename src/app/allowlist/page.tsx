'use client';

import MainLayout from '@/layouts/MainLayout';
import WhitelistModule, { PUBLIC_SALE_START } from '@/modules/Whitelist';
import styles from './styles.module.scss';
import React from 'react';
import { redirect } from 'next/navigation';
import { checkIsPublicSale } from '@/modules/Whitelist/utils';

const Whitelist = () => {
  const onRedirect = () => {
    const isPublicSale = checkIsPublicSale();
    if (isPublicSale) redirect('public-sale');
  }
  React.useEffect(() => {
    onRedirect()
    setInterval(() => {
      onRedirect()
    }, 5000)
  }, []);

  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#F3F1E8',
      }}
    >
      <div className={styles.container}>
        <WhitelistModule/>
      </div>
    </MainLayout>
  );
};

export default Whitelist;
