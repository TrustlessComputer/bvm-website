'use client';

import MainLayout from '@layouts/MainLayout';
import Hero from './section/Hero';
import Category from './section/Category';
import s from '@/modules/gamefi/styles.module.scss';
import { Box } from '@chakra-ui/react';
import Loader from '@/modules/builder-landing/Loader';
import React from 'react';
import Link from 'next/link';
import Actions from '../bvm_v3/Actions';

const ShardModuleV2 = () => {
  return (
    <MainLayout
      headerProps={{
        color: 'white',
      }}
    >
      <div className={`${s.wrapper}  `}>
        {/*<div className={s.topHero}>*/}
        {/*  <Box h={['80px', '140px']} />*/}
        {/*  <RetroHero />*/}
        {/*</div>*/}
        <div className={`${s.inner} containerV3`}>
          <Actions />

          <Box className={s.container} bgColor={'#f6f6f6'}>
            <div className={s.heroSection}>
              <Hero />
            </div>
            <div className={s.categorySection}>
              <Category />
            </div>
          </Box>
        </div>
      </div>
    </MainLayout>
  );
};

export default ShardModuleV2;
