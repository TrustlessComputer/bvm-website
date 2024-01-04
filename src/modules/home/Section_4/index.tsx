'use client';

import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';

interface IContent {
  title: string;
  description: string;
}

const CONTENTS = [
  {
    title: 'Choose a rollup method',
    description: 'Optimistic rollups or ZK rollups',
  },
  {
    title: 'Choose a block time',
    description: '10s, 5s, or 2s — entirely up to you.',
  },
  {
    title: 'Choose pre-installed dapps',
    description: 'DEX, DAO, NFT marketplace, and more over time.',
  },
  {
    title: 'Then launch it',
    description: 'It’s that easy!',
  },
];

const Section_4 = () => {
  const renderContent = (item: IContent, index: number) => {
    return (
      <VStack key={item.title} spacing={['16px']} alignItems={'flex-start'}>
        <Text fontSize={['16px']} fontWeight={700} color={'#00C250'}>
          {`0${index + 1}.`}
        </Text>
        <Text fontSize={['20px']} fontWeight={500} color={'#000'}>
          {item.title}
        </Text>
        <Text fontSize={['16px']} fontWeight={400} color={'#000'}>
          {item.description}
        </Text>
      </VStack>
    );
  };
  return (
    <Box
      bgColor={'#fff'}
      display={'flex'}
      flexDirection={'column'}
      py={['120px']}
    >
      <HStack
        display={'flex'}
        flexDirection={'row'}
        className="maxWidth"
        alignSelf={'center'}
        spacing={['70px']}
      >
        <Flex flex={1} flexDirection={'column'}>
          <Text fontSize={['48px']} color={'#000'}>
            <Text fontSize={['48px']} color={'#00C250'} as="span">
              A no-code tool
            </Text>{' '}
            for building a full-featured Bitcoin L2 blockchain.
          </Text>
          <Box height={['20px']}></Box>
          <VStack
            display={'flex'}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            spacing={['20px']}
            divider={<StackDivider borderColor="gray.200" />}
          >
            {CONTENTS.map(renderContent)}
          </VStack>
        </Flex>
        <Flex flex={1}>
          <Image src="/images/image_section_3.png" />
        </Flex>
      </HStack>
    </Box>
  );
};

export default Section_4;
