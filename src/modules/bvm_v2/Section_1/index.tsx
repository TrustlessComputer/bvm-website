'use client';

import { BUY_TC_URL } from '@/config';
import { Button, Flex, Image, Text } from '@chakra-ui/react';

const Section_1 = () => {
  return (
    <Flex
      w={'100%'}
      flexDir={'column'}
      bgColor={'transparent'}
      gap={['16px']}
      alignItems={'flex-start'}
    >
      <Text
        fontSize={['16px', '40px']}
        lineHeight={'48px'}
        fontWeight={400}
        color={'#000'}
      >
        What is BVM?
      </Text>
      <Text
        fontSize={['14px', '20px']}
        lineHeight={'36px'}
        fontWeight={400}
        color={'#000'}
        maxW={'709px'}
      >
        Whatever your vision — a dapp, a fully onchain game, a DEX, or an
        ecosystem — there are many benefits of running your own blockchain.
      </Text>
      <Button
        bgColor={'#FA4E0E'}
        color={'#fff'}
        minW={['66px']}
        minH={'16px'}
        borderRadius={0}
        py={'16px'}
        px={'40px'}
        fontWeight={400}
        fontSize={'16px'}
        onClick={() => {
          window.open(BUY_TC_URL, '_blank');
        }}
        _hover={{
          opacity: 0.8,
        }}
      >
        {`Get BVM`}
      </Button>
    </Flex>
  );
};

export default Section_1;
