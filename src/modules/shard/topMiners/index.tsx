'use client';

import MainLayout from '@layouts/MainLayout';
import Category from '@/modules/shard/section/Category';
import s from '@/modules/gamefi/styles.module.scss';
import { Box } from '@chakra-ui/react';
import Loader from '@/modules/builder-landing/Loader';
import React from 'react';
import AboveTheFold from '@/modules/shard/topMiners/aboveTheFold';

const ShardTopMinersModule = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <Loader />
      <Box className={s.container} bgColor={'#f6f6f6'}>
        <div className={s.heroSection}>
          <AboveTheFold />
        </div>
        <div className={s.categorySection}>
          <Category />
        </div>
      </Box>
    </MainLayout>
  )
};

export default ShardTopMinersModule;
