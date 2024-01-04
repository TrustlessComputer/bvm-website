'use client';

import { Box, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';

import Section1 from './Section_1';
// import Section2 from './Section_2';
import Section2 from './Section_2_vs2';

const BuildingBlockModule = () => {
  return (
    <Box className={s.container}>
      <Flex
        className="maxWidth"
        w={'100%'}
        h={'100%'}
        marginTop={'120px'}
        paddingBottom={'120px'}
        height={'100%'}
        flexDirection={'column'}
        alignItems={'flex-start'}
        alignSelf={'center'}
      >
        <Box h={['20px', '40px']} />
        <Section1 />
        <Box h={['20px', '40px']} />
        <Section2 />
      </Flex>
    </Box>
  );
};

export default BuildingBlockModule;
