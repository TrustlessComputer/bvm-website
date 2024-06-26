'use client';

import MainLayout from '@layouts/MainLayout';
import Hero from './section/Hero';
import Category from './section/Category';
import s from '@/modules/gamefi/styles.module.scss';
import { Box } from '@chakra-ui/react';
import Loader from '@/modules/builder-landing/Loader';
import React from 'react';

const ShardModule = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'white',
      }}
    >
      <Loader />
      <Box className={s.container} bgColor={'#f6f6f6'}>
        <div className={s.heroSection}>
          <Hero />
        </div>
        <div className={s.categorySection}>
          <Category />
        </div>
      </Box>
    </MainLayout>
  )
};

export default ShardModule;
