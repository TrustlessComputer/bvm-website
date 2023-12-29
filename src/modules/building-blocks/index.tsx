'use client';

import { Box, Flex } from '@chakra-ui/react';
import s from './styles.module.scss';

import Section1 from './Section_1';
import Section2 from './Section_2';

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
        px={[4, null]}
        flexDirection={'column'}
        alignItems={'flex-start'}
        alignSelf={'center'}
      >
        <Section1 />
        <Box h={['30px', '80px']} />
        <Section2 />
      </Flex>
    </Box>
  );
};

export default BuildingBlockModule;
