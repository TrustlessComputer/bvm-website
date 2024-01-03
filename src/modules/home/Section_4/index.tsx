'use client';

import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
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
      <HStack key={item.title}>
        <Text fontSize={['20px']} fontWeight={500} color={'#000'}>
          {index + 1}
        </Text>
        <Box>
          <Text fontSize={['22px']} fontWeight={500} color={'#000'}>
            {item.title}
          </Text>
          <Text fontSize={['20px']} color={'#000'}>
            {item.description}
          </Text>
        </Box>
      </HStack>
    );
  };
  return (
    <Box bgColor={'#F3F1E8'} display={'flex'} flexDirection={'column'}>
      <HStack
        display={'flex'}
        flexDirection={'row'}
        className="maxWidth"
        alignSelf={'center'}
        bgColor={'lightcyan'}
        spacing={['50px']}
      >
        <Flex flex={1}>
          <Image src="/images/image_section_3.png" />
        </Flex>
        <Flex flex={1} flexDirection={'column'}>
          <Text fontSize={['38px']} color={'#000'}>
            A no-code tool for building a full-featured Bitcoin L2 blockchain.
          </Text>
          <VStack
            display={'flex'}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
          >
            {CONTENTS.map(renderContent)}
          </VStack>
        </Flex>
      </HStack>
    </Box>
  );
};

export default Section_4;
