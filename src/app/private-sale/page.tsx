"use client";

import PrivateSaleModule from '@/modules/PrivateSale';
import MainLayout from '@/layouts/MainLayout';
import s from './styles.module.scss';
import LocalStorageUtil from "@/utils/localstorage";
import { KEY_VC_TYPE } from '@/constants/storage-key';
import { useEffect } from 'react';
import { getCacheTokensRate } from '@/services/bitcoin';

const PrivateSale = () => {
  const vcType = LocalStorageUtil.get(KEY_VC_TYPE);

  useEffect(() => {
    if(!vcType) {
      LocalStorageUtil.set(KEY_VC_TYPE, 'vc1');
    }
  }, [vcType]);

  useEffect(() => {
    getCacheTokensRate();
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
