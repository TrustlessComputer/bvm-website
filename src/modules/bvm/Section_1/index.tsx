'use client';

import { BUY_TC_URL } from '@/config';
import { Button, Flex, Box, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const Section_1 = () => {
  const router = useRouter();

  return (
    <Flex
      w={'100%'}
      flexDir={{
        base: 'column',
        lg: 'row',
      }}
      align={'center'}
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
        <Text fontSize={['16px', '40px']} fontWeight={500} color={'#000'}>
          What is BVM?
        </Text>
        <Text fontSize={['18px']} fontWeight={400} color={'#000'}>
          BVM is the native cryptocurrency of Bitcoin Virtual Machine. When you
          use a Bitcoin dapp powered by Bitcoin Virtual Machine, you’ll pay a
          transaction fee in BVM.
        </Text>
        <Button
          marginTop={'5px'}
          bgColor={'#FF7E21'}
          color={'#fff'}
          borderRadius={100}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          px={'24px'}
          py={'10px'}
          minW={['180px']}
          height={'48px'}
          fontWeight={400}
          fontSize={'20px'}
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
      <Flex flex={1} justify={'flex-end'}>
        <Image
          alignSelf={'center'}
          maxWidth="380"
          src={`/images/what_is_bvm.png`}
          w={'100%'}
          h="auto"
          // src={`${CDN_URL}/nbc/images/token_banner.svg`}
        />
      </Flex>
    </Flex>
  );
};

export default Section_1;
