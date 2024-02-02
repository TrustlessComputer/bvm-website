'use client';

import s from './styles.module.scss';
import { Box } from '@chakra-ui/react';
import AboveTheFold from './aboveTheFold';
import Allocation from '@/modules/bvm_v2/Allocation';
import RoadmapModule from '@/modules/PublicSale/roadmap';
import FAQContent from '@/modules/Whitelist/FAQContent';
import TopContent from '@/modules/PublicSale/topContent';
import React from 'react';
import IntroVideos from '@/modules/PublicSale/IntroVideos';
import useTradeNakaEvent from '@/modules/PublicSale/activities/hooks/useTradeNakaEvent';
import LuckyMoney from '@/modules/PublicSale/luckyMoney';
import useGetNumberReport from '@/modules/PublicSale/activities/hooks/useGetNumberReport';

const PublicSaleModule = () => {
  useTradeNakaEvent();
  useGetNumberReport();
  return (
    <Box className={s.container}>
      <div className={s.contentTop}>
        <div className="container">
          <TopContent />
          <AboveTheFold />
        </div>
      </div>
      <IntroVideos />
      <RoadmapModule />
      <Allocation />
      <FAQContent />
      <LuckyMoney />
    </Box>
  );
};

export default PublicSaleModule;
