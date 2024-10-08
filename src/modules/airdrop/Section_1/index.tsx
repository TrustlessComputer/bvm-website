'use client';

import { Flex, Text } from '@chakra-ui/react';

const Section_1 = () => {
  return (
    <Flex
      w={'100%'}
      flexDir={'column'}
      bgColor={'transparent'}
      gap={['16px']}
      align={'center'}
    >
      <Text
        fontSize={['16px', '40px']}
        lineHeight={'48px'}
        fontWeight={400}
        color={'#000'}
      >
        Airdrop
      </Text>
      <Text
        fontSize={['14px', '20px']}
        lineHeight={'36px'}
        fontWeight={400}
        color={'#000'}
        maxW={'744px'}
        textAlign="center"
      >
        Thanks for supporting our 2023 'testnet'. In 2024 mainnet, an airdrop awaits users of BVM products including Generative, Perceptrons, GM, and Alpha.<br/>
        Snapshot on Jan 16, 2024. Claimable on Jan 30, 2024.
      </Text>
      <Text
        fontSize={['14px', '20px']}
        lineHeight={'36px'}
        fontWeight={400}
        color={'#fa4e0e'}
        maxW={'744px'}
        textAlign="center"
      >
        Please note that if you do not claim your airdrop by the next release, it will be revoked and will not be accessible for future claims.
      </Text>
    </Flex>
  );
};

export default Section_1;
