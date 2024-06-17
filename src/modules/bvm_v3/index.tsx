'use client';

import { Box } from '@chakra-ui/react';
import s from './styles.module.scss';

import BoxContent from '@/layouts/BoxContent';
import Section1 from './Section_1';
import Section2 from './Section_2';
import Allocation from '@/modules/bvm_v3/Allocation';
import TgeModule from '../tge';
import Fade from '@/interactive/Fade';
import Tokens from './Token';
import Partners from '@/modules/bvm_v3/Partners';
import Actions from './Actions';

const BVMModule = () => {
  return (
    <div className={`${s.wrapper}  `}>
      <div className={`${s.inner} containerV3`}>
        {/*<Actions />*/}
        <Box className={s.container}>
          <TgeModule />
          <Tokens />
          <Partners />
          <div className={s.container_section_tow}>
            <BoxContent >
              <Fade delayEnter={0.6}>
                <Section1 />
              </Fade>
              <Fade delayEnter={0.7}>
                <Section2 />
              </Fade>
            </BoxContent>
          </div>
          <Allocation />
        </Box>
      </div>
    </div>


  );
};

export default BVMModule;
