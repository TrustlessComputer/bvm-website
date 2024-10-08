'use client';

import s from './styles.module.scss';
import Allocation from '@/modules/bvm_v4/Allocation';
import About from '@/modules/bvm_v4/About';
import BuyBVMV2 from '@/modules/bvm_v4/BuyBVMV2';
import BVMUtilities from '@/modules/bvm_v4/BVMUtilities';
import HeroV4 from '@/modules/bvm_v4/HeroV4';
import HeroV2 from '@/modules/bvm_v4/HeroV2';
import Token from '@/modules/bvm_v4/Token';

const BVMModule = () => {
  return (
    <div className={`${s.wrapper}  `}>
      <div className={`${s.inner} containerV3`}>
        <HeroV4 />
      </div>
      <About />
      <BVMUtilities />
      <Token />
      <Allocation />
    </div>
  );
};

export default BVMModule;
