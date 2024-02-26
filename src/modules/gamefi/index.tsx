'use client';

import { Box } from '@chakra-ui/react';
import BoxContent from '@/layouts/BoxContent';
import Categories from '@/modules/gamefi/Categories';
import Section1 from './Section_1';
import SectionFooter from './SectionFooter';
// import Section2 from './Section_2';
import s from './styles.module.scss';

const GameFiModule = () => {
  return (
    <Box className={s.container} bgColor={'#fff'}>
      <BoxContent minH={'70dvh'}>
        <Box h={['20px', '140px']} />
        <Section1 />
      </BoxContent>
        <Categories />
        <Box h={['20px', '40px']} />
        <SectionFooter />
    </Box>
  );
};

export default GameFiModule;
