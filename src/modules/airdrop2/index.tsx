'use client';

import { Box } from '@chakra-ui/react';
import s from './styles.module.scss';

import BoxContent from '@/layouts/BoxContent';
import TopSection from './TopSection';
import Section2 from './Section_2';
import BuilderSection from './BuilderSection';

const AirdropModule = () => {
  return (
    <Box className={s.container} bgColor={'#fff'}>
      <BoxContent minH={'100dvh'} alignItems="center">
        <Box h={['20px', '140px']} />
        <TopSection />
        <Box h={['30px', '35px', '48px']} />
        <BuilderSection />
        <Box h={['20px', '40px']} />
        <Section2 />
        <Box h={['20px', '40px']} />
      </BoxContent>
    </Box>
  );
};

export default AirdropModule;
