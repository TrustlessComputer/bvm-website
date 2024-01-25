'use client';

import { Box } from '@chakra-ui/react';
import s from './styles.module.scss';

import BoxContent from '@/layouts/BoxContent';
import Section1 from './Section_1';
import Section2 from './Section_2';

const RoadmapModule = () => {
  return (
    <Box className={s.container}>
      <BoxContent>
        <Box h={['20px', '140px']} />
        <Section1 />
        <Box h={['20px', '80px', '140px']} />
        <Section2 />
        <Box h={['20px', '40px']} />
      </BoxContent>
    </Box>
  );
};

export default RoadmapModule;
