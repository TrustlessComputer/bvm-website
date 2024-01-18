'use client';

import { Flex, Box, Text } from '@chakra-ui/react';

const Section1 = () => {
  return (
    <Flex w={'100%'} flexDir={['column']}>
      <Text
        flex={1}
        fontSize={['28px', '48px']}
        fontWeight={400}
        lineHeight={'110%'}
        textAlign={['center', 'left']}
        color={'#000'}
      >
        Module Store
      </Text>
      <Box boxSize={['20px', null]} />
      <Text
        fontSize={['16px', '20px']}
        fontWeight={400}
        lineHeight={'36px'}
        wordBreak={'break-word'}
        color={'#000'}
      >
        Find the best-of-breed blockchain modules for your Bitcoin L2
        blockchain.
      </Text>
    </Flex>
  );
};

export default Section1;
