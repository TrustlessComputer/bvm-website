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

const Section_3 = () => {
  return (
    <Box
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize={'cover'}
      bgColor={'#000'}
      bgImg={`${CDN_URL_ICONS}/lego-bg-footer.svg`}
      display={'flex'}
      flexDirection={'column'}
    >
      <Flex display={'flex'} align="center" justify="center" flexDir={'column'}>
        <Box height={[12, 24]} />
        <HStack
          spacing={'0px'}
          padding={'6px'}
          width={'max-content'}
          borderRadius="full"
          backgroundColor={'#262626'}
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

        <Box height={[3]} />
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
        <Box height={[2]} />
        <Text
          textAlign={'center'}
          fontSize={['34px', '68px']}
          lineHeight={'110%'}
          wordBreak={'break-word'}
          whiteSpace="pre-line"
        >
          {`Bitcoin Virtual Machine`}
        </Text>
        <Box height={['32px']} />
        <HStack align="center" justify="center">
          <Button
            bgColor={'#FF7E21'}
            borderRadius={100}
            px={'24px'}
            py={'10px'}
            color={'#000'}
            fontSize={['16px']}
            fontWeight={400}
          >
            {`Join the Allowlist`}
          </Button>
        </HStack>
        <Box height={[12, 24]} />
      </Flex>
    </Box>
  );
};

export default Section_3;
