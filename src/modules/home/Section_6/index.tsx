'use client';

import { CDN_APP_ICON_URL } from '@/config';
import {
  Box,
  Flex,
  HStack,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

interface IContent {
  title: string;
  icon: string;
  description: string;
}

const CONTENTS: Array<IContent> = [
  {
    title: 'Unlimited throughput',
    description:
      'Hyperscale Bitcoin with an unlimited number of Bitcoin Virtual Machines as Bitcoin L2 blockchains.',
    icon: 'reinvention_13.png',
  },
  {
    title: 'Infinite applications',
    description:
      'Bitcoin Virtual Machines support Solidity smart contracts on Bitcoin, so you can quickly build all kinds of decentralized applications on Bitcoin.',
    icon: 'reinvention_14.png',
  },
  {
    title: 'Fast & cheap',
    description:
      'Bitcoin Virtual Machines implement rollups on Bitcoin. Rollups significantly reduce the block time and transaction fees.',
    icon: 'reinvention_15.png',
  },
];

const Section_6 = () => {
  const renderItem = (item: IContent) => {
    return (
      <Flex
        key={item.title}
        flexDir={'column'}
        justify={'center'}
        p={['20px']}
        flex={1}
        bgColor={'#fff'}
      >
        <Image
          src={`${CDN_APP_ICON_URL}/${item.icon}`}
          maxW={'360px'}
          w={'100%'}
          alignSelf={'center'}
        />
        <Box h={['20px']}></Box>
        <Text
          fontSize={['24px']}
          align="center"
          fontWeight={400}
          color={'#000'}
        >
          {item.title}
        </Text>
        <Box h={['16px']}></Box>
        <Text
          fontSize={['16px']}
          align="center"
          fontWeight={400}
          color={'#000'}
        >
          {item.description}
        </Text>
      </Flex>
    );
  };

  return (
    <Box
      bgColor={'#F3F1E8'}
      display={'flex'}
      flexDirection={'column'}
      py={['120px']}
    >
      <HStack
        display={'flex'}
        flexDirection={'row'}
        className="maxWidth"
        alignSelf={'center'}
        spacing={['50px']}
      >
        <Flex flex={1} flexDirection={'column'} justify={'center'}>
          <Text fontSize={['48px']} color={'#000'} textAlign={'center'}>
            Scalable infrastructure for Bitcoin
          </Text>
          <Box height={['16px']} />
          <Text
            fontSize={['20px']}
            fontWeight={400}
            color={'#000'}
            textAlign={'center'}
          >
            If Ethereum is the world’s computer, Bitcoin is the world’s
            supercomputer. With Bitcoin Virtual Machine, anyone can launch their
            own Bitcoin L2 blockchain.
          </Text>
          <Box height={['40px']} />
          <Flex padding={['24px']} gap={['36px']}>
            {CONTENTS.map(renderItem)}
          </Flex>
        </Flex>
      </HStack>
    </Box>
  );
};

export default Section_6;
