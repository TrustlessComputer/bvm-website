'use client';

import { Box, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';

import Section1 from './Section_1';
// import Section2 from './Section_2';
import Section2 from './Section_2_vs2';
import BoxContent from '@/layouts/BoxContent';

const BuildingBlockModule = () => {
  return (
    <Box className={s.container}>
      <BoxContent>
        <Box h={['20px', '140px']} />
        <Section1 />
        <Box h={['20px', '40px']} />
        <Section2 />
      </BoxContent>
    </Box>
  );
};

export default BuildingBlockModule;
