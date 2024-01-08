'use client';

import { CDN_URL_ICONS, DEVELOPERS_DOC_URL } from '@/config';
import { ChevronRightIcon } from '@chakra-ui/icons';
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
import { BlockchainsList, BlockchainsType } from './data';

const Section_1 = () => {
  const router = useRouter();
  return (
    <Box
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize={'cover'}
      bgImg={`/images/lego_bg_vs3.png`}
      bgColor={'#EE550C'}
      display={'flex'}
      justifyContent={'center'}
      alignContent={'center'}
    >
      <Box
        p={['20px', '120px', '180px', '240px', '320px']}
        className="maxWidth"
        position={'relative'}
        marginBottom={'30px'}
      >
        <Text
          textAlign={'center'}
          fontSize={['26px', '32px', '48px', '64px']}
          lineHeight={'110%'}
          wordBreak={'break-word'}
          whiteSpace="pre-line"
        >
          {`Bitcoin Virtual Machine`}
        </Text>
        <Box height={'16px'} />
        <Text
          textAlign={'center'}
          fontSize={[14, 18, 24, 32]}
          lineHeight={'140%'}
          fontWeight={400}
          wordBreak={'break-word'}
          whiteSpace="pre-line"
        >
          BVM is a metaprotocol that lets developers launch their own
          lightning-fast and low-cost Bitcoin L2 blockchain in a few clicks and
          start building decentralized applications on Bitcoin.
        </Text>

        <Box height={'40px'} />

        <HStack align="center" justify="center" spacing={['6px', '18px']}>
          <Button
            bgColor={'#fff'}
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
            fontSize={'20px'}
            onClick={() => {
              router.push('/blockchains/computers');
            }}
          >
            {`Build your Bitcoin L2`}
          </Button>
          <Button
            // bgColor={'#FFA564'}
            bgColor={'transparent'}
            color={'#fff'}
            borderRadius={100}
            px={'24px'}
            py={'10px'}
            height={'48px'}
            fontWeight={400}
            fontSize={'20px'}
            _hover={{
              bgColor: 'transparent',
            }}
            onClick={() => {
              // window.open('https://docs.bvm.network/', '_blank')
              window.open(DEVELOPERS_DOC_URL, '_blank');
            }}
          >
            {`Explore the docs`}
            <ChevronRightIcon width={'20px'} height={'20px'} mt={'2px'} />
          </Button>
        </HStack>

        <Box height={'40px'} />

        <Flex
          display={'flex'}
          position={'absolute'}
          bottom={0}
          left={0}
          right={0}
          flexDir={'column'}
          alignSelf={'center'}
          justify={'center'}
          w={'100%'}
        >
          <Text
            textAlign={'center'}
            fontSize={['14px', '16px', '20px', '24px']}
            lineHeight={'140%'}
            fontWeight={400}
            wordBreak={'break-word'}
            whiteSpace="pre-line"
          >
            Powered by blockchain building blocks
          </Text>
          <Box height={'20px'}></Box>
          {/* <Flex
            display={'flex'}
            alignItems={'center'}
            justify={'center'}
            gap={'8px'}
          >
            {BlockchainsList.map((item: BlockchainsType, index: number) => {
              return (
                <Flex
                  key={item.title + index}
                  flexDir="row"
                  alignItems={'center'}
                  bgColor={'#E98454'}
                  py={'12px'}
                  px={'16px'}
                  borderRadius={'8px'}
                  gap={'12px'}
                >
                  <Image src={item.logoUrl} scale={0.5}></Image>
                  <Text
                    textAlign={'center'}
                    fontSize={['14px', '20px']}
                    lineHeight={'110%'}
                    fontWeight={400}
                  >
                    {item.title}
                  </Text>
                </Flex>
              );
            })}
          </Flex> */}
          <Flex display={'flex'} alignItems={'center'} justify={'center'}>
            <Image
              src={'/images/legos_list.png'}
              h={['50px', '60px', '80px', '100px', '124px']}
              w={['220px', '280px', '384px', '480px', '600px']}
            ></Image>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Section_1;
