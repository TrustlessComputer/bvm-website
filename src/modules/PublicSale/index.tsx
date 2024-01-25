"use client";

import s from './styles.module.scss';
import { Box } from '@chakra-ui/react';
import AboveTheFold from './aboveTheFold';
import Allocation from '@/modules/bvm_v2/Allocation';

const PublicSaleModule = () => {
  return (
    <Box className={s.container}>
      <AboveTheFold />
      <Allocation />
    </Box>
  );
};

export default PublicSaleModule;
