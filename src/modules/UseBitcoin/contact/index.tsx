'use client';

import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';

import { useRouter } from 'next/navigation';
import { BlockDataList, BlockItemType } from './config';

const Contact = () => {
  const router = useRouter();
  const renderNetworkList = (
    item?: {
      logoUrl: string;
      name: string;
      isComingSoon?: boolean;
    }[],
  ) => {
    return (
      <HStack
        spacing={['5px', '8px']}
        overflowX={'auto'}
        flexWrap={'wrap'}
        height={'100%'}
        minH={'100px'}
      >
        {item &&
          item.map((obj, index) => (
            <Flex
              key={`${obj.name + index}`}
              display={'flex'}
              align={'center'}
              justify={'center'}
              flexDir={'column'}
              minW={[100]}
              minH={[100]}
              p={['16px']}
              bgColor={'white'}
              height={'100%'}
            >
              <Image key={`${obj.logoUrl}-${index}`} src={obj.logoUrl} />
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
      <VStack
        key={item.key}
        w={'100%'}
        zIndex={item.zIndex}
        alignItems={'flex-start'}
        spacing={['10px', '16px']}
      >
        <Text
          fontSize={['16px', '20px']}
          color={'#000'}
          fontWeight={400}
          textAlign={'left'}
        >
          {`${item.label || ''}`}
        </Text>
        {renderNetworkList(item.networkList)}
      </VStack>
    );
  };

  const renderGroupButton = () => {
    return (
      <Flex
        display={'flex'}
        flex={1}
        flexDirection={'column'}
        gap={['20px', '24px']}
      >
        <Flex
          flexDir={'column'}
          align={'left'}
          // gap={'24px'}
          p={['18px', '20px']}
          bgColor={'#FFF7F2'}
          borderColor={'#FFD3B3'}
          borderWidth={1}
        >
          <Text
            fontSize={['20px', '24px']}
            lineHeight={['30px', '33px']}
            fontWeight={400}
            color={'#000'}
          >
            Launch your Bitcoin L2
          </Text>
          <Box h={'8px'}></Box>
          <Text
            fontSize={['16px', '18px']}
            lineHeight={['22px', '26px']}
            fontWeight={400}
            color={'#000'}
          >
            It’s easy to customize and launch your own Bitcoin L2
            blockchain—just a few clicks.
          </Text>
          <Box h={'24px'}></Box>
          <Button
            bgColor={'#FA4E0E'}
            color={'#fff'}
            borderRadius={0}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            px={'24px'}
            py={'16px'}
            w={['217px']}
            h={'48px'}
            fontWeight={400}
            fontSize={'16px'}
            onClick={() => {
              router.push('/rollups/customize');
            }}
            _hover={{
              opacity: 0.8,
            }}
          >
            Launch your Bitcoin L2
          </Button>
        </Flex>
        {/*<Flex*/}
        {/*  flexDir={'column'}*/}
        {/*  align={'left'}*/}
        {/*  // gap={'24px'}*/}
        {/*  p={['18px', '20px']}*/}
        {/*  bgColor={'#F8F8F8'}*/}
        {/*  borderColor={'#ECECEC'}*/}
        {/*  borderWidth={1}*/}
        {/*>*/}
        {/*  <Text*/}
        {/*    fontSize={['20px', '24px']}*/}
        {/*    lineHeight={['30px', '33px']}*/}
        {/*    fontWeight={400}*/}
        {/*    color={'#000'}*/}
        {/*  >*/}
        {/*    Manage your Bitcoin L2s*/}
        {/*  </Text>*/}

        {/*  <Box h={'8px'}></Box>*/}
        {/*  <Text*/}
        {/*    fontSize={['16px', '18px']}*/}
        {/*    lineHeight={['22px', '26px']}*/}
        {/*    fontWeight={400}*/}
        {/*    color={'#000'}*/}
        {/*  >*/}
        {/*    Access all information about your Bitcoin L2s here.*/}
        {/*  </Text>*/}
        {/*  <Box h={'24px'}></Box>*/}
        {/*  <Button*/}
        {/*    bgColor={'#000'}*/}
        {/*    color={'#fff'}*/}
        {/*    borderRadius={0}*/}
        {/*    display={'flex'}*/}
        {/*    justifyContent={'center'}*/}
        {/*    alignItems={'center'}*/}
        {/*    px={'24px'}*/}
        {/*    py={'16px'}*/}
        {/*    w={['217px']}*/}
        {/*    h={'48px'}*/}
        {/*    fontWeight={400}*/}
        {/*    fontSize={'16px'}*/}
        {/*    onClick={() => {*/}
        {/*      //TO DO*/}
        {/*      window.open('https://twitter.com/bvmnetwork', '_blank');*/}
        {/*    }}*/}
        {/*    _hover={{*/}
        {/*      opacity: 0.8,*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    View details*/}
        {/*  </Button>*/}
        {/*</Flex>*/}
      </Flex>
    );
  };

  return (
    <Flex
      flexDir={{
        base: 'column',
        '2xl': 'row',
      }}
      gap={{
        base: '50px',
        '2xl': '0px',
      }}
    >
      {renderGroupButton()}
    </Flex>
  );
};

export default Contact;
