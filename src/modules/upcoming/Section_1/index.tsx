'use client';

import { Flex, Text } from '@chakra-ui/react';

const Section_1 = () => {
  return (
    <Flex
      w={'100%'}
      flexDir={'column'}
      bgColor={'transparent'}
      gap={['16px']}
      align={'left'}
    >
      <Text
        fontSize={['16px', '40px']}
        lineHeight={'48px'}
        fontWeight={400}
        color={'#000'}
      >
        Upcoming Bitcoin L2 Launch
      </Text>
      <Text
        fontSize={['14px', '20px']}
        lineHeight={'36px'}
        fontWeight={400}
        color={'#000'}
        maxW={'744px'}
      >
        Be the first to know when new Bitcoin L2 chains launch.
      </Text>
    </Flex>
  );
};

export default Section_1;
