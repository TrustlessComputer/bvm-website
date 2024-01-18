"use client";

import s from './styles.module.scss';
import {Box} from "@chakra-ui/react";
import AboveTheFold from "./aboveTheFold";
import LocalStorageUtil from '@/utils/localstorage';
import { KEY_VC_TYPE } from '@/constants/storage-key';
import { useEffect } from 'react';
import { getCacheTokensRate } from '@/services/bitcoin';

const PrivateSaleModule = () => {
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
    <Box className={s.container}>
      <AboveTheFold />
    </Box>
  );
};

export default PrivateSaleModule;
