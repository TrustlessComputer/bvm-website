'use client';

import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  VStack,
  Image,
  StackDivider,
  Text,
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
      <Flex key={item.title} alignItems={'center'}>
        <Box
          w={'40px'}
          h={'40px'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          fontSize={['18px']}
          fontWeight={700}
          bgColor={'#FF7E21'}
          borderRadius={100}
        >
          {`${index + 1}`}
        </Box>
        <Box w={'20px'}></Box>
        <VStack alignItems={'flex-start'}>
          <Text fontSize={['24px']} fontWeight={500} color={'#000'}>
            {item.title}
          </Text>
          <Text
            fontSize={['18px']}
            fontWeight={400}
            color={'#000'}
            opacity={0.7}
          >
            {item.description}
          </Text>
        </VStack>
      </Flex>
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
            <Text fontSize={['48px']} color={'#FF7E21'} as="span">
              A no-code tool
            </Text>{' '}
            for building a full-featured Bitcoin L2 blockchain.
          </Text>
          <Box height={['40px']}></Box>
          <VStack
            display={'flex'}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            spacing={['20px']}
            divider={<StackDivider borderColor={'#ECECEC'} />}
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
