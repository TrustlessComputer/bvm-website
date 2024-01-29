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

const Whitelist = () => {
  const onRedirect = () => {
    const PUBLIC_SALE_TIME = isProduction ? PUBLIC_SALE_START : '2024-01-29 04:00:00';
    const isPublicSale = dayjs
      .utc(PUBLIC_SALE_TIME, 'YYYY-MM-DD HH:mm:ss')
      .isBefore(dayjs().utc().format());
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
