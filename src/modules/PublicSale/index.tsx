"use client";

import s from './styles.module.scss';
import { Box } from '@chakra-ui/react';
import AboveTheFold from './aboveTheFold';
import Allocation from '@/modules/bvm_v2/Allocation';
import RoadmapModule from '@/modules/PublicSale/roadmap';
import FAQContent from '@/modules/Whitelist/FAQContent';
import TopContent from '@/modules/PublicSale/topContent';
import React from 'react';
import IntroVideos from '@/modules/PublicSale/IntroVideos';

const PublicSaleModule = () => {
  return (
    <Box className={s.container}>
      <div className={s.contentTop}>
        <div className='container'>
          <TopContent />
          <AboveTheFold />
        </div>
      </div>
      <IntroVideos />
      <RoadmapModule />
      <Allocation />
      <FAQContent />
    </Box>
  );
};

export default PublicSaleModule;
