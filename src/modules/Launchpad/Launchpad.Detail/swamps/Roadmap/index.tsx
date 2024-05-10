'use client';

import {Box, Image, Text} from '@chakra-ui/react';
import s from './styles.module.scss';
import React from 'react';

const Roadmap = () => {
  return (
    <div className={s.wrapper}>
      <Text className={s.title}>Roadmap</Text>
      <Box className={s.container}>
        <Image
          src={'/images/launchpad/swamps/roadmap.png'}
          alt={'road map'}
          maxW="100%"
          maxH={'650px'}
          mx="auto"
          mb={{ base: '24px', md: '80px' }}
          display={{ base: 'none', sm: 'block' }}
        />
      </Box>
    </div>
  );
};

export default Roadmap;
