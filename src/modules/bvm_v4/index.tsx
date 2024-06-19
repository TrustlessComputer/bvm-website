'use client';

import { Box } from '@chakra-ui/react';
import s from './styles.module.scss';
import Allocation from '@/modules/bvm_v4/Allocation';
import BuyBVMModule from '@/modules/bvm_v4/BuyBVM';
import HeroV2 from '@/modules/bvm_v4/HeroV2';
import NBC from '@/modules/bvm_v4/NBC';

const BVMModule = () => {
  return (
    <div className={`${s.wrapper}  `}>
      <div className={`${s.inner} containerV3`}>
        <Box className={s.container}>
          <HeroV2 />
          <NBC />
          <Allocation />
          <BuyBVMModule />
        </Box>
      </div>
    </div>
  );
};

export default BVMModule;
