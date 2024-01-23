"use client";

import s from './styles.module.scss';
import {Box} from "@chakra-ui/react";
import AboveTheFold from "./aboveTheFold";
import LocalStorageUtil from '@/utils/localstorage';
import { KEY_VC_TYPE } from '@/constants/storage-key';
import { useEffect } from 'react';
import { getCacheTokensRate } from '@/services/bitcoin';
import { useParams } from 'next/navigation';

const PublicSaleModule = () => {
  const params = useParams();
  const vcType = LocalStorageUtil.get(KEY_VC_TYPE);
  const id = params?.id;

  useEffect(() => {
    if(!vcType && id) {
      LocalStorageUtil.set(KEY_VC_TYPE, id);
    }
  }, [vcType, id]);

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

export default PublicSaleModule;
