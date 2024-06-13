'use client';

import { Box } from '@chakra-ui/react';
import s from './styles.module.scss';

import BoxContent from '@/layouts/BoxContent';
import Section1 from './Section_1';
import Section2 from './Section_2';
import Allocation from '@/modules/bvm_v3/Allocation';
// import Vesting from '@/modules/bvm_v2/Vesting';
// import Schedule from '@/modules/bvm_v2/Schedule';
// import RetroHero from './RetroHero';
import TgeModule from '../tge';
import Fade from '@/interactive/Fade';
import Tokens from './Token';
import Partners from '@/modules/bvm_v2/Partners';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Actions from './Actions';

const BVMModule = () => {
  return (
    <div className={`${s.wrapper}  `}>
      {/*<div className={s.topHero}>*/}
      {/*  <Box h={['80px', '140px']} />*/}
      {/*  <RetroHero />*/}
      {/*</div>*/}
      <div className={`${s.inner} containerV3`}>
        <Actions />

        <Box className={s.container}>
          <TgeModule />
          {/*<Box h={['20px', '40px']} />*/}
          <Tokens />
          <Partners />
          <div className={s.container_section_tow}>
            <BoxContent >
              {/*<Box h={['120px', '80px']} />*/}
              <Fade delayEnter={0.6}>
                <Section1 />
              </Fade>
              {/*<Box h={['20px', '80px']} />*/}
              <Fade delayEnter={0.7}>
                <Section2 />
              </Fade>
              {/*<Box h={['20px', '40px']} />*/}
              {/*<Vesting />*/}
              {/*<Schedule />*/}
            </BoxContent>
          </div>

          <Allocation />
        </Box>
      </div>
    </div>
  );
};

export default BVMModule;
