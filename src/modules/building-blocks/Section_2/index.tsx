'use client';

import {
  Box,
  Flex,
  HStack,
  Image,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { BlockDataList, BlockItemType } from './config';

const Section2 = () => {
  const renderLabelData = (lable: string, chainsCount: number) => {
    return (
      <Flex direction={'row'} minW={['150px', '300px']}>
        <Flex
          direction={'row'}
          borderRadius={1000}
          display={'flex'}
          p={{
            base: '6px 16px',
            sm: '12px 24px',
          }}
          align={'center'}
          bgColor={'#fff'}
        >
          <Text fontSize={['12px', '20px']} color={'#000'} fontWeight={500}>
            {lable}
          </Text>
          <Box w={'8px'}></Box>
          <Flex
            boxSize={['24px', '36px']}
            borderRadius={100}
            display={'flex'}
            align={'center'}
            justify={'center'}
            bgColor={'#006440'}
          >
            <Text
              fontSize={['12px', '20px']}
              color={'#fff'}
              lineHeight={'100%'}
              fontWeight={500}
              m={0}
            >
              {chainsCount}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    );
  };

  const renderStackIcons = (logoURLStack?: string[]) => {
    return (
      <HStack spacing={['12px', '24px']} overflowX={'auto'}>
        {logoURLStack &&
          logoURLStack.map((url, index) => (
            <Image
              key={`${url}-${index}`}
              src={url}
              borderRadius={100}
              boxSize={['32px', '72px']}
            />
          ))}
      </HStack>
    );
  };

  const renderItem = (item: BlockItemType) => {
    return (
      <HStack key={item.key} w={'100%'}>
        {renderLabelData(item.key, item.logoStack?.length || 0)}
        {renderStackIcons(item.logoStack)}
      </HStack>
    );
  };

  return (
    <VStack
      w={'100%'}
      spacing={['28px', '96px']}
      divider={<StackDivider borderColor={'#00000019'} />}
    >
      {BlockDataList.map(renderItem)}
    </VStack>
  );
};

export default Section2;
