import s from './styles.module.scss';
import {Box, Flex, Image, Text} from '@chakra-ui/react';
import React from "react";

const Tokenomics = () => {
  return (
    <div className={s.wrapper}>
      <Flex flexDirection="column" alignItems="center" gap="6px">
        <p className={s.title}>$GSWP Tokenomics</p>
        <Text as="p" color="black" fontSize="22px" opacity="0.7">
          The total supply of GSWP is permanently fixed at 1B tokens.
        </Text>
      </Flex>
      <Box className={s.container}>
        <Image
          src={'/images/launchpad/swamps/tokenomic.png'}
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

export default Tokenomics;
