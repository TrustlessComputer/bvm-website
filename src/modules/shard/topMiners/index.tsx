'use client';

import MainLayout from '@layouts/MainLayout';
import s from '@/modules/gamefi/styles.module.scss';
import { Box } from '@chakra-ui/react';
import Loader from '@/modules/builder-landing/Loader';
import React from 'react';
import AboveTheFold from '@/modules/shard/topMiners/aboveTheFold';
import Leaderboard from '@/modules/shard/topMiners/Leaderboard';

const ShardTopMinersModule = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'black',
      }}
    >
      <Loader />
      <Box className={s.container} bgColor={'#FFF'}>
        <div className={s.heroSection}>
          <AboveTheFold />
        </div>
        <div className={s.categorySection}>
          <Leaderboard />
        </div>
      </Box>
    </MainLayout>
  )
};

export default ShardTopMinersModule;
