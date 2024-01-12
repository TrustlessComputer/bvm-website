'use client';

import { Box } from '@chakra-ui/react';
import s from './styles.module.scss';

import BoxContent from '@/layouts/BoxContent';
import Section1 from './Section_1';
import Section2 from './Section_2';
import Allocation from './Allocation';
import Vesting from './Vesting';
import Schedule from './Schedule';

const BVMModule = () => {
  return (
    <Box className={s.container}>
      <BoxContent>
        <Box h={['80px', '140px']} />
        <Section1 />
        <Box h={['20px', '80px']} />
        <Section2 />
        <Box h={['20px', '40px']} />
        <Allocation />
        <Vesting />
        <Schedule />
      </BoxContent>
    </Box>
  );
};

export default BVMModule;
