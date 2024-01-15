'use client';

import { BUY_TC_URL } from '@/config';
import { Button, Flex, Image, Text } from '@chakra-ui/react';

const Section_1 = () => {
  return (
    <Flex
      w={'100%'}
      flexDir={'column'}
      bgColor={'transparent'}
      gap={{ base: '12px', md: '16px' }}
      alignItems={'center'}
    >
      <Text
        fontSize={['28px', '40px']}
        lineHeight={{ base: '140%', md: '120%' }}
        fontWeight={400}
        color={'#000'}
      >
        $BVM
      </Text>
      <Text
        fontSize={['16px', '20px']}
        lineHeight={['24px', '36px']}
        textAlign={'center'}
        fontWeight={400}
        color={'#000'}
        maxW={'709px'}
      >
        BVM is the native cryptocurrency used within the BVM ecosystem to empower builders building the future of Bitcoin.
      </Text>
      {/* <Button
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
      </Button> */}
    </Flex>
  );
};

export default Section_1;
