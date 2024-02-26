'use client';

import { Box } from '@chakra-ui/react';
import BoxContent from '@/layouts/BoxContent';
import Section1 from './Section_1';
import SectionFooter from './SectionFooter';
// import Section2 from './Section_2';
import s from './styles.module.scss';

const GameFiModule = () => {
  return (
    <Box className={s.container} bgColor={'#fff'}>
      <BoxContent minH={'100dvh'}>
        <Box h={['20px', '140px']} />
        <Section1 />
        <Box h={['30px', '35px', '48px']} />
        {/* <Section2 /> */}
        <Box h={['20px', '40px']} />
        <SectionFooter/>
      </BoxContent>
    </Box>
  );
};

export default GameFiModule;
