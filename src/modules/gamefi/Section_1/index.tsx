'use client';

import { Button, Flex, Image, Text } from '@chakra-ui/react';

import { BUY_TC_URL } from '@/config';

const Section_1 = () => {
  return (
    <Flex
      w={'100%'}
      flexDir={{
        base: 'column',
        lg: 'row',
      }}
      align={'start'}
      bgColor={'#fff'}
      px={['60px']}
      py={['30px']}
      minH={['300px']}
      borderRadius={'8px'}
      gap={{
        base: '40px',
        '2xl': '0px',
      }}
    >
      <Flex
        flexDir={'column'}
        flex={1}
        alignItems={{
          base: 'center',
          lg: 'flex-start',
        }}
        gap={['18px']}
      >
        <Text
          fontSize={['20px']}
          lineHeight={'24px'}
          fontWeight={400}
          color={'#000'}
        >
          GameFi
        </Text>
        <Text
          fontSize={['16px', '40px']}
          lineHeight={'48px'}
          fontWeight={500}
          color={'#000'}
        >
          Designed for Game builders
        </Text>
        <Text fontSize={['18px', '20px']} fontWeight={400} color={'#000'}>
          Shaping the Future of Gaming on Bitcoin
        </Text>
        <Button
          marginTop={'5px'}
          bgColor={'#EF601B'}
          color={'#fff'}
          borderRadius={0}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          px={'24px'}
          py={'10px'}
          minW={['180px']}
          height={'48px'}
          fontWeight={400}
          fontSize={'16px'}
          gap={['8px']}
          onClick={() => {
            window.open(BUY_TC_URL, '_blank');
          }}
          _hover={{
            opacity: 0.8,
          }}
        >
          {`Create your own GameFi L2`}
        </Button>
      </Flex>
      <Flex flex={1} justify={'flex-end'}>
        <Image
          alignSelf={'center'}
          maxWidth="780"
          src={`/gamefi/compress/gamefi.png`}
          w={'100%'}
          h="auto"
          // src={`${CDN_URL}/nbc/images/token_banner.svg`}
        />
      </Flex>
    </Flex>
  );
};
export default Section_1;
