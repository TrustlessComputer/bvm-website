'use client';

import { Box, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';

import Section1 from './Section_1';
import Section2 from './Section_2';

const BVMModule = () => {
  return (
    <Box className={s.container}>
      <Flex
        className="maxWidth"
        w={'100%'}
        h={'100%'}
        marginTop={'80px'}
        paddingBottom={'80px'}
        height={'100%'}
        flexDirection={'column'}
        alignItems={'flex-start'}
        alignSelf={'center'}
      >
        <Box h={['20px', '80px']} />
        <Section1 />
        <Box h={['20px', '80px']} />
        <Section2 />
      </Flex>
    </Box>
  );
};

export default BVMModule;
