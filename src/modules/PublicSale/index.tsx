"use client";

import s from './styles.module.scss';
import { Box } from '@chakra-ui/react';
import AboveTheFold from './aboveTheFold';

const PublicSaleModule = () => {
  return (
    <Box className={s.container}>
      <AboveTheFold />
    </Box>
  );
};

export default PublicSaleModule;
