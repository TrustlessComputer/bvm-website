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
} from '@chakra-ui/react';

const Section_1 = () => {
  return (
    <Box
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize={'cover'}
      bgColor={'#006440'}
      bgImg={`${CDN_URL_ICONS}/lego_bg.svg`}
      h={'90vh'}
      display={'flex'}
    >
      <AbsoluteCenter>
        <Text
          textAlign={'center'}
          fontSize={[36, 60, 90]}
          lineHeight={'110%'}
          wordBreak={'break-word'}
          whiteSpace="pre-line"
        >
          {`Bitcoin Virtual Machine`}
        </Text>

        <Text
          textAlign={'center'}
          fontSize={[16, 18, 22]}
          lineHeight={'140%'}
          wordBreak={'break-word'}
          whiteSpace="pre-line"
        >
          {`Bitcoin Virtual Machine is a metaprotocol that lets developers
            launch their own lighting-fast and low-cost blockchain, backed by Bitcoin security, in a
            few clicks and start building decentralized applications on Bitcoin`}
        </Text>

        <Box height={'32px'} />

        <HStack align="center" justify="center">
          <Button
            bgColor={'#0BF269'}
            borderRadius={100}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            px={'24px'}
            py={'10px'}
          >
            <Center>
              <Text color={'#000'} fontSize={'16px'} fontWeight={400}>
                {`Join the Allowlist`}
              </Text>
            </Center>
          </Button>
          <Button
            bgColor={'#fff'}
            borderRadius={100}
            px={'24px'}
            py={'10px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Text
              color={'#000'}
              fontSize={'16px'}
              fontWeight={400}
              lineHeight={17}
            >
              {`Get started for free`}
            </Text>
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
          <HStack>
            <Text color={'#fff'} fontSize={16} fontWeight={700}>
              {`1,025 `}
            </Text>
            <Text
              color={'rgba(255, 255, 255, 0.70)'}
              fontSize={16}
              fontWeight={400}
            >
              {`people on the allowlist.`}
            </Text>
            <Text color={'#FFD600'} fontSize={16} fontWeight={700}>
              {`14h : 30m : 59s`}
            </Text>
          </HStack>
        </Flex>
      </AbsoluteCenter>
    </Box>
  );
};

export default Section_1;
