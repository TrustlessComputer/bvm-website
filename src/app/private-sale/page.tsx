"use client";

import PrivateSaleModule from '@/modules/PrivateSale';
import MainLayout from '@/layouts/MainLayout';
import s from './styles.module.scss';
import LocalStorageUtil from '@/utils/localstorage';
import { KEY_VC_TYPE } from '@/constants/storage-key';
import { useEffect } from 'react';
import { getCacheTokensRate } from '@/services/bitcoin';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NakaChain - Bitcoin L2 for BRC-20 DeFi',
  description: 'Bitcoin L2 - Only 2 seconds block time - Almost 0 transaction fee- Receive free NakaChain Token',
  twitter: {
    card: 'summary_large_image',
    title: {
      default: 'NakaChain',
      template: '%s - NakaChain',
    },
    description: 'Bitcoin L2 - Only 2 seconds block time - Almost 0 transaction fee- Receive free NakaChain Token',
    images: [{ url: `https://storage.googleapis.com/nakachain/naka/images/nakaswap_metadata.jpg` }],
  },
};

const PrivateSale = () => {
  const vcType = LocalStorageUtil.get(KEY_VC_TYPE);

  useEffect(() => {
    if(!vcType) {
      LocalStorageUtil.set(KEY_VC_TYPE, 'vc1');
    }
  }, [vcType]);

  useEffect(() => {
    getCacheTokensRate();

    const interval = setInterval(() => {
      getCacheTokensRate();
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <MainLayout>
      <div className={s.container}>
        <PrivateSaleModule />
      </div>
    </MainLayout>
  );
};

export default PrivateSale;
