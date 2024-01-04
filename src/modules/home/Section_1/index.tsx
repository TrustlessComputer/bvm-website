'use client';

import { CDN_URL_ICONS } from '@/config';
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const Section_1 = () => {
  const router = useRouter();
  return (
    <Box
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize={'cover'}
      bgColor={'#006440'}
      bgImg={`${CDN_URL_ICONS}/lego_bg.svg`}
      display={'flex'}
      justifyContent={'center'}
      alignContent={'center'}
    >
      <Box
        p={['20px', '120px', '180px', '240px', '320px']}
        className="maxWidth"
      >
        <Text
          textAlign={'center'}
          fontSize={[26, 32, 48, 72]}
          lineHeight={'110%'}
          wordBreak={'break-word'}
          whiteSpace="pre-line"
        >
          {`Bitcoin Virtual Machine`}
        </Text>

        <Box height={'16px'} />
        <Text
          textAlign={'center'}
          fontSize={[12, 15, 18, 20]}
          lineHeight={'140%'}
          fontWeight={400}
          wordBreak={'break-word'}
          whiteSpace="pre-line"
        >
          BVM is a metaprotocol that lets developers launch their own
          lightning-fast and low-cost Bitcoin L2 blockchain in a few clicks and
          start building decentralized applications on Bitcoin.
        </Text>

        <Box height={'32px'} />

        <HStack align="center" justify="center" spacing={['6px', '12px']}>
          <Button
            bgColor={'#0BF269'}
            color={'#000'}
            borderRadius={100}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            px={'24px'}
            py={'10px'}
            minW={['180px']}
            height={'48px'}
            fontWeight={400}
            fontSize={'14px'}
            onClick={() => {
              router.push('/blockchains/computers');
            }}
          >
            {`START BUILDING`}
          </Button>
          <Button
            bgColor={'#fff'}
            color={'#000'}
            borderRadius={100}
            px={'24px'}
            py={'10px'}
            minW={['180px']}
            display={'flex'}
            height={'48px'}
            justifyContent={'center'}
            alignItems={'center'}
            fontWeight={400}
            fontSize={'14px'}
            onClick={() =>
              window.open('https://docs.trustless.computer/', '_blank')
            }
          >
            {`READ DOCS`}
          </Button>
        </HStack>

        <Box height={'32px'} />

        {/* <Flex display={'flex'} align="center" justify="center">
          <HStack
            padding={'6px'}
            spacing={'0px'}
            width={'max-content'}
            borderRadius="full"
            backgroundColor={'#267B5D'}
          >
            <Image
              src="/images/user_1.png"
              marginRight={'-15px'}
              boxSize={'48px'}
            />
            <Image
              src="/images/user_2.png"
              marginRight={'-15px'}
              boxSize={'48px'}
            />
            <Image
              src="/images/user_3.png"
              marginRight={'-15px'}
              boxSize={'48px'}
            />
            <Image src="/images/user_4.png" boxSize={'48px'} />
          </HStack>
        </Flex> */}
        {/* 
        <Flex display={'flex'} align="center" justify="center">
          <HStack display={'flex'} align="center">
            <Text color={'#fff'} fontSize={['20px']} fontWeight={700}>
              {`1,025 `}
            </Text>
            <Text
              color={'rgba(255, 255, 255, 0.70)'}
              fontSize={['20px']}
              fontWeight={400}
            >
              {`people on the allowlist.`}
            </Text>
            <Text color={'#FFD600'} fontSize={['20px']} fontWeight={700}>
              {`14h : 30m : 59s`}
            </Text>
          </HStack>
        </Flex> */}
      </Box>
    </Box>
  );
};

export default Section_1;
