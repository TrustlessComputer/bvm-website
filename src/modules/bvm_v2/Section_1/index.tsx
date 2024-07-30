'use client';
import { Button, Flex, Image, Text } from '@chakra-ui/react';

const Section_1 = () => {
  return (
    <Flex
      w={'100%'}
      flexDir={'column'}
      bgColor={'#fff'}
      gap={{ base: '12px', md: '16px' }}
      alignItems={'center'}
    >
      <Text
        fontSize={['28px', '40px']}
        lineHeight={{ base: '140%', md: '120%' }}
        fontWeight={400}
        color={'#000'}
      >
        BVM Utilities
      </Text>
      <Text
        fontSize={['16px', '20px']}
        lineHeight={['24px', '36px']}
        textAlign={'center'}
        fontWeight={400}
        color={'#000'}
        maxW={'709px'}
      >
        {/*BVM is the governance and utility token used within the BVM ecosystem to empower builders and users to build the*/}
        {/*future of Bitcoin.*/}
        BVM is the native cryptocurrency used within the BVM ecosystem to empower builders and users to build the future of Bitcoin.
      </Text>
      {/* <Flex flexDir={'column'} gap={'12px'} paddingTop={'8px'}>
        <Button
          bgColor={'#FA4E0E'}
          color={'#fff'}
          minW={['256px']}
          minH={'48px'}
          borderRadius={0}
          py={'16px'}
          px={'40px'}
          fontWeight={400}
          fontSize={'16px'}
          _hover={{
            opacity: 0.8,
          }}
        >
          {'Buy BVM'}
        </Button>

        <Button
          bgColor={'#FA4E0E0D'}
          color={'#000000'}
          border={'1px solid #FA4E0E4D'}
          minW={['256px']}
          minH={'48px'}
          borderRadius={0}
          lineHeight={'19px'}
          py={'16px'}
          px={'40px'}
          fontWeight={400}
          fontSize={'16px'}
          onClick={() => {
            window.open('https://nakachain.xyz/staking', '_blank');
          }}
          _hover={{
            opacity: 0.8,
          }}
        >
          25%-58% APY.
          <span className={s.btn_sub}>
            Stake BVM <SvgInset size={20} svgUrl="/bvm-sct/icon-arrow-r.svg" />
          </span>
        </Button>
      </Flex> */}
    </Flex>
  );
};

export default Section_1;
