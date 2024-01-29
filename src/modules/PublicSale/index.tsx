"use client";

import s from './styles.module.scss';
import { Box } from '@chakra-ui/react';
import AboveTheFold from './aboveTheFold';
import Allocation from '@/modules/bvm_v2/Allocation';
import RoadmapModule from '@/modules/PublicSale/roadmap';
import FAQContent from '@/modules/Whitelist/FAQContent';

const PublicSaleModule = () => {
  return (
    <Box className={s.container}>
      <AboveTheFold />
      <RoadmapModule />
      <Allocation />
      <FAQContent />
    </Box>
  );
};

export default PublicSaleModule;
