"use client";

import s from './styles.module.scss';
import { Box } from '@chakra-ui/react';
import AboveTheFold from './aboveTheFold';
import Allocation from '@/modules/bvm_v2/Allocation';
import RoadmapModule from '@/modules/PublicSale/roadmap';

const PublicSaleModule = () => {
  return (
    <Box className={s.container}>
      <AboveTheFold />
      <Allocation />
      <RoadmapModule />
    </Box>
  );
};

export default PublicSaleModule;
