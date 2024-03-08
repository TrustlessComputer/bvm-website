'use client';

import { Box } from '@chakra-ui/react';
import s from './styles.module.scss';

import BoxContent from '@/layouts/BoxContent';
import Section1 from './Section_1';
import Section2 from './Section_2';
import Allocation from '@/modules/bvm_v2/Allocation';
import Vesting from '@/modules/bvm_v2/Vesting';
import Schedule from '@/modules/bvm_v2/Schedule';
import Hero from './Hero';
import TgeModule from '../tge';
import Fade from '@/interactive/Fade';

const BVMModule = () => {
  return (
    <div>
      {/*<div className={s.topHero}>*/}
      {/*  <Box h={['80px', '140px']} />*/}
      {/*  <Hero />*/}
      {/*</div>*/}
      <Box className={s.container}>
        <TgeModule />
        <Box h={['20px', '40px']} />

        <div className={s.container_section_tow}>
          <BoxContent minH={'100dvh'}>
            <Box h={['120px', '180px']} />
            <Fade delayEnter={.6}>
              <Section1 />
            </Fade>
            <Box h={['20px', '80px']} />
            <Fade delayEnter={.7}>
              <Section2 />
            </Fade>
            <Box h={['20px', '40px']} />
            {/*<Vesting />*/}
            {/*<Schedule />*/}
          </BoxContent>
        </div>

        <Allocation />
      </Box>
    </div>
  );
};

export default BVMModule;
