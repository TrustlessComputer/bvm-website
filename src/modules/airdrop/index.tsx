'use client';

import { Box } from '@chakra-ui/react';
import s from './styles.module.scss';

import BoxContent from '@/layouts/BoxContent';
import Section1 from './Section_1';
import Section2 from './Section_2';

const AirdropModule = () => {
  return (
    <Box className={s.container} bgColor={'#fff'}>
      <BoxContent minH={'100dvh'} alignItems="center">
        <Box h={['20px', '140px']} />
        <Section1 />
        <Box h={['30px', '35px', '48px']} />
        <Section2 />
        <Box h={['20px', '40px']} />
      </BoxContent>
    </Box>
  );
};

export default AirdropModule;
