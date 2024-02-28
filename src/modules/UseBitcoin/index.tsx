'use client';

import s from './styles.module.scss';
import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import useTradeNakaEvent from '@/modules/PublicSale/activities/hooks/useTradeNakaEvent';
import useGetNumberReport from '@/modules/PublicSale/activities/hooks/useGetNumberReport';
import ActivitiesVer2 from '@/modules/UseBitcoin/AcitivitiesVer2';
import TopContent from '@/modules/UseBitcoin/topContent';
import Contact from '@/modules/UseBitcoin/contact';

const UseBitcoinModule = () => {
  useTradeNakaEvent();
  useGetNumberReport();
  return (
    <Box className={s.container}>
      <div className={s.contentTop}>
        <div className="container">
          <TopContent />
          <SimpleGrid gridTemplateColumns={["1fr", "720px 468px"]} gap={["40px", "80px"]} m={"0 auto"} w={"fit-content"}>
            <ActivitiesVer2 />
            <Contact />
          </SimpleGrid>
        </div>
      </div>
    </Box>
  );
};

export default UseBitcoinModule;
