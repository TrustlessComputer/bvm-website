'use client';

import {
  AbsoluteCenter,
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
  const renderLabelData = (item: BlockItemType) => {
    return (
      <Flex
        position={'relative'}
        direction={'row'}
        minW={['180px', '375px']}
        h={'100%'}
        alignItems={'center'}
        justify={'space-between'}
        borderRadius={'8px'}
        py={['40px']}
        px={['32px']}
        bgColor={item.bgColor}
      >
        <Text fontSize={['12px', '20px']} color={'#fff'} fontWeight={500}>
          {`${item.label || ''}`}
        </Text>
        <Box w={'8px'}></Box>
        <Flex
          boxSize={['37px', '30px']}
          borderRadius={100}
          display={'flex'}
          align={'center'}
          justify={'center'}
          bgColor={item.bgCircle}
        >
          <Text
            fontSize={['12px', '16px']}
            color={'#fff'}
            lineHeight={'100%'}
            fontWeight={500}
          >
            {item.networkList?.length || 1}
          </Text>
        </Flex>
        {!item.isLastItem && (
          <Flex
            position={'absolute'}
            left={0}
            right={0}
            bottom={'-18px'}
            padding={['15px']}
            height={'40px'}
            display={'flex'}
            justify={'center'}
            align={'center'}
            zIndex={-1}
          >
            <Box
              borderWidth={'5px'}
              borderColor={'#fff'}
              bgColor={item.bgColor}
              w={'38px'}
              h={'38px'}
              borderRadius={100}
            ></Box>
          </Flex>
        )}
      </Flex>
    );
  };

  const renderNetworkList = (
    item?: {
      logoUrl: string;
      name: string;
      isComingSoon?: boolean;
    }[],
  ) => {
    return (
      <HStack spacing={['5px', '5px']} overflowX={'auto'} maxH={['100px']}>
        {item &&
          item.map((obj, index) => (
            <Flex
              key={`${obj.name + index}`}
              display={'flex'}
              align={'center'}
              justify={'center'}
              flexDir={'column'}
              borderRadius={'8px'}
              minW={[100]}
              minH={[100]}
              bgColor={'#fff'}
            >
              <Image
                key={`${obj.logoUrl}-${index}`}
                src={obj.logoUrl}
                borderRadius={100}
                boxSize={['32px', '48px']}
              />
              <Box height={'4px'}></Box>
              <Text
                fontSize={['12px']}
                fontWeight={400}
                opacity={obj.isComingSoon ? 0.4 : 1}
                color={`#000`}
              >
                {obj.name || ''}
              </Text>
            </Flex>
          ))}
      </HStack>
    );
  };

  const renderItem = (item: BlockItemType) => {
    return (
      <HStack
        key={item.key}
        w={'100%'}
        maxH={['100px']}
        zIndex={item.zIndex}
        spacing={['5px', '5px']}
      >
        {renderLabelData(item)}
        {renderNetworkList(item.networkList)}
      </HStack>
    );
  };

  return (
    <VStack w={'100%'} spacing={['5px', '5px']}>
      {BlockDataList.map(renderItem)}
    </VStack>
  );
};

export default Section2;
