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

const Section_1 = () => {
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
      <Box w={['450px', '1000px']} my={['135px', '193px']} className="maxWidth">
        <Text
          textAlign={'center'}
          fontSize={['36px', '100px']}
          lineHeight={'110%'}
          wordBreak={'break-word'}
          whiteSpace="pre-line"
        >
          {`Bitcoin Virtual Machine`}
        </Text>

        <Text
          textAlign={'center'}
          fontSize={['16px', '22px']}
          lineHeight={'140%'}
          fontWeight={400}
          wordBreak={'break-word'}
          whiteSpace="pre-line"
        >
          Bitcoin Virtual Machine is a metaprotocol that lets developers launch
          their own lighting-fast and low-cost blockchain, backed by Bitcoin
          security, in a few clicks and start building decentralized
          applications on Bitcoin
        </Text>

        <Box height={'32px'} />

        <HStack align="center" justify="center" spacing={['6px', '12px']}>
          <Button
            bgColor={'#0BF269'}
            borderRadius={100}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            px={'24px'}
            py={'10px'}
            fontWeight={400}
            fontSize={'16px'}
          >
            {`Join the Allowlist`}
          </Button>
          <Button
            bgColor={'#fff'}
            borderRadius={100}
            px={'24px'}
            py={'10px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            fontWeight={400}
            fontSize={'16px'}
          >
            {`Get started for free`}
          </Button>
        </HStack>

        <Box height={'32px'} />

        <Flex display={'flex'} align="center" justify="center">
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
        </Flex>

        <Box height={'12px'} />

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
        </Flex>
      </Box>
    </Box>
  );
};

export default Section_1;
