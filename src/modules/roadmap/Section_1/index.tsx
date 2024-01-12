'use client';

import { Flex, Text } from '@chakra-ui/react';

const Section_1 = () => {
  return (
    <Flex
      w={'100%'}
      flexDir={'column'}
      bgColor={'transparent'}
      gap={['16px']}
      align={"center"}
    >
      <Text
        fontSize={['16px', '40px']}
        lineHeight={'48px'}
        fontWeight={400}
        color={'#000'}
      >
        Roadmap
      </Text>
      <Text
        fontSize={['14px', '20px']}
        lineHeight={'36px'}
        fontWeight={400}
        color={'#000'}
        maxW={'744px'}
      >
        Our mission is to make Bitcoin as generalized as possible — usable for far more than just a currency. We want DeFi, AI, DAOs, NFTs, and gaming all on Bitcoin.
      </Text>
    </Flex>
  );
};

export default Section_1;
