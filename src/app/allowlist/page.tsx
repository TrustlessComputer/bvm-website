'use client';

import MainLayout from '@/layouts/MainLayout';
import WhitelistModule, { PUBLIC_SALE_START } from '@/modules/Whitelist';
import styles from './styles.module.scss';
import React from 'react';
import { isProduction } from '@/config';
import { redirect } from 'next/navigation';
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

export const checkIsPublicSale = () => {
  return dayjs
    .utc(PUBLIC_SALE_START, 'YYYY-MM-DD HH:mm:ss')
    .isBefore(dayjs().utc().format());
}

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
