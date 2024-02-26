'use client';

import { Box } from '@chakra-ui/react';
import BoxContent from '@/layouts/BoxContent';
import Section1 from './Hero';
// import Section2 from './Section_2';
import s from './styles.module.scss';
import Categories from '@/modules/gamefi/Categories';
import Hero from './Hero';

const RoadmapModule = () => {
  return (
    <>
      {/*<Box className={s.container} bgColor={'#fff'}>*/}
      {/*  <BoxContent minH={'100dvh'}>*/}
      {/*    <Box h={['20px', '140px']} />*/}
      {/*    <Section1 />*/}
      {/*    /!*<Box h={['30px', '35px', '48px']} />*!/*/}
      {/*    /!* <Section2 /> *!/*/}
      {/*    /!*<Box h={['20px', '40px']} />*!/*/}
      {/*  </BoxContent>*/}

      {/*</Box>*/}
      <Hero />
      <Categories />

    </>

  );
};

export default RoadmapModule;
