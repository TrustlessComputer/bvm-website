'use client';

import { Box } from '@chakra-ui/react';
import s from './styles.module.scss';
import Allocation from '@/modules/bvm_v4/Allocation';
import BuyBVMModule from '@/modules/bvm_v4/BuyBVM';
import HeroV2 from '@/modules/bvm_v4/HeroV2';
import NBC from '@/modules/bvm_v4/NBC';
import HeroV3 from '@/modules/bvm_v4/HeroV3';
import About from '@/modules/bvm_v4/About';
import BuyBVMV2 from '@/modules/bvm_v4/BuyBVMV2';
import BVMUtilities from '@/modules/bvm_v4/BVMUtilities';

const BVMModule = () => {
  return (
    <div className={`${s.wrapper}  `}>
      <div className={`${s.inner} containerV3`}>
        <HeroV3 />
        <BuyBVMV2 />
      </div>
      <About />
      <BVMUtilities />
      <Allocation />
    </div>
  );
};

export default BVMModule;
