'use client';

import s from './styles.module.scss';
import { Box } from '@chakra-ui/react';
import React from 'react';
import useTradeNakaEvent from '@/modules/PublicSale/activities/hooks/useTradeNakaEvent';
import useGetNumberReport from '@/modules/PublicSale/activities/hooks/useGetNumberReport';
import ActivitiesVer2 from '@/modules/UseBitcoin/AcitivitiesVer2';
import TopContent from '@/modules/UseBitcoin/topContent';

const UseBitcoinModule = () => {
  useTradeNakaEvent();
  useGetNumberReport();
  return (
    <Box className={s.container}>
      <div className={s.contentTop}>
        <div className="container">
          <TopContent />
          <ActivitiesVer2 />
        </div>
      </div>
    </Box>
  );
};

export default UseBitcoinModule;
